import { FileContent } from "use-file-picker/types";
import ImportFormat from "../types/ImportFormat";
import TransactionViewModel from "../types/TransactionViewModel";
import moment from "moment";
import { isEmpty } from "./StringHelper";
import { formatDateOnly } from "./DateHelper";

type CsvRow = { [x: string]: string };

export function prepareImport(
    format: ImportFormat,
    files: FileContent<ArrayBuffer>[]
): TransactionViewModel[] {
    const allRows = files
        .map((f) => parseCsv(format, f.content.toString()))
        .flat();

    return allRows
        .map((r) => csvRowToTransaction(format, r))
        .filter((t) => t !== null);
}

function parseCsv(format: ImportFormat, content: string): CsvRow[] {
    const lines = content.split(/[\r\n]+/);
    const header = lines[format.headerLines].split(format.delimiter);

    const result = [];
    for (let i = format.headerLines + 1; i < lines.length; i++) {
        if (lines[i].trim().length === 0) continue;
        const line = lines[i].split(format.delimiter);
        const columns = line.map((col, i) => ({ [header[i]]: col }));
        result.push(columns.reduce((acc, v) => ({ ...acc, ...v })));
    }
    return result;
}

function csvRowToTransaction(
    format: ImportFormat,
    row: CsvRow
): TransactionViewModel | null {
    const date = row[format.dateKey];
    const amount = row[format.amountKey];
    const memo = getTransactionMemo(format.memoFormat, row);

    if (!areCsvValuesValid(date, memo, amount)) return null;

    return {
        date: formatDateOnly(row[format.dateKey]),
        amount: Math.floor(
            parseFloat(row[format.amountKey]) *
                (format.invertAmounts ? -1 : 1) *
                100
        ),
        memo: getTransactionMemo(format.memoFormat, row),
    };
}

function getTransactionMemo(memoFormat: string, row: CsvRow) {
    const placeholders = memoFormat.match(/{\w+}/);
    if (!placeholders) return memoFormat;

    for (const placeholder of placeholders) {
        memoFormat = memoFormat.replaceAll(
            placeholder,
            row[placeholder.substring(1, placeholder.length - 1)]
        );
    }

    return memoFormat;
}

function areCsvValuesValid(
    date: string,
    memo: string,
    amount: string
): boolean {
    return (
        !isEmpty(date) &&
        !isEmpty(memo) &&
        !isEmpty(amount) &&
        !isNaN(Number(amount.trim())) &&
        moment(date).isValid()
    );
}

export function chunkedPrepareImport(
    format: ImportFormat,
    files: FileContent<ArrayBuffer>[],
    chunkSize = 1000
): Promise<TransactionViewModel[]> {
    return new Promise((resolve) => {
        let allRows: any[] = [];
        let index = 0;

        function processFilesChunk() {
            const end = Math.min(index + chunkSize, files.length);
            for (let i = index; i < end; i++) {
                const rows = parseCsv(format, files[i].content.toString());
                allRows = allRows.concat(rows);
            }
            index = end;

            if (index < files.length) {
                requestAnimationFrame(processFilesChunk);
            } else {
                processRowsChunk();
            }
        }

        function processRowsChunk() {
            let transactionIndex = 0;
            const transactions: TransactionViewModel[] = [];

            function processChunk() {
                const end = Math.min(
                    transactionIndex + chunkSize,
                    allRows.length
                );
                for (let i = transactionIndex; i < end; i++) {
                    const transaction = csvRowToTransaction(format, allRows[i]);
                    if (transaction !== null) {
                        transactions.push(transaction);
                    }
                }
                transactionIndex = end;

                if (transactionIndex < allRows.length) {
                    requestAnimationFrame(processChunk);
                } else {
                    resolve(transactions);
                }
            }

            requestAnimationFrame(processChunk);
        }

        requestAnimationFrame(processFilesChunk);
    });
}

import { parse } from "csv-parse/browser/esm";
import moment from "moment";
import { FileContent } from "use-file-picker/types";
import ImportFormat from "../types/ImportFormat";
import TransactionViewModel from "../types/TransactionViewModel";
import { formatDateOnly } from "./DateHelper";
import { isEmpty } from "./StringHelper";

type CsvRow = { [x: string]: string };

export function parseCsvToTransactions(
    format: ImportFormat,
    files: FileContent<ArrayBuffer>[]
): Promise<TransactionViewModel[]> {
    return new Promise((resolve, reject) => {
        (async () => {
            let allRows: CsvRow[] = [];

            // parse all csv files
            for (const file of files) {
                try {
                    const rows = await parseFile(file.content.toString());
                    allRows = allRows.concat(rows);
                } catch (err) {
                    reject(err);
                    return;
                }
            }

            // convert all rows to transactions of given format
            const transactions = allRows
                .map((r) => csvRowToTransaction(format, r))
                .filter((t) => t !== null);

            resolve(transactions);
        })();
    });
}

function parseFile(content: string): Promise<CsvRow[]> {
    return new Promise((resolve, reject) => {
        parse(
            content,
            {
                columns: true,
                trim: true,
            },
            (err, records) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(records);
                }
            }
        );
    });
}

function csvRowToTransaction(
    format: ImportFormat,
    row: CsvRow
): TransactionViewModel | null {
    const date = row[format.dateKey];
    const amount = row[format.amountKey];
    const memo = getTransactionMemo(format.memoKeys, row);

    if (!areCsvValuesValid(date, memo, amount)) return null;

    return {
        date: formatDateOnly(date),
        amount: Math.round(
            Number(amount) * (format.invertAmounts ? -1 : 1) * 100
        ),
        memo,
    };
}

function getTransactionMemo(memoFormat: string, row: CsvRow) {
    return memoFormat
        .split(",")
        .map((k) => row[k] || "")
        .filter((v) => !isEmpty(v))
        .join(" | ");
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

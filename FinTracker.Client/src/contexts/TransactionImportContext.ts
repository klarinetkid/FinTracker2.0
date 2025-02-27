import { createContext } from "react";
import { FileContent } from "use-file-picker/types";
import MemoService from "../services/MemoService";
import TransactionService from "../services/TransactionService";
import { CategoryOrUncategorized } from "../types/Category";
import ImportFormat from "../types/ImportFormat";
import MemoViewModel from "../types/MemoViewModel";
import TransactionViewModel from "../types/TransactionViewModel";
import { prepareImport } from "../utils/CsvHelper";

export type ImportParams = {
    format: ImportFormat;
    filesContent: FileContent<ArrayBuffer>[];
};

export type ImportResult = {
    transactionsInserted: number;
    memosInserted: number;
};

export class TransactionImportManager {
    public Transcations: TransactionViewModel[];
    private setTransactions: React.Dispatch<
        React.SetStateAction<TransactionViewModel[]>
    >;

    constructor(
        transactions?: TransactionViewModel[],
        setTransactions?: React.Dispatch<
            React.SetStateAction<TransactionViewModel[]>
        >
    ) {
        this.Transcations = transactions ?? [];
        this.setTransactions = setTransactions ?? (() => undefined);
    }

    public async PrepareImport(params: ImportParams): Promise<void> {
        const { format, filesContent } = params;

        if (!format || !filesContent) return;

        //const prepared = await chunkedPrepareImport(format, filesContent, 100);
        const prepared = await prepareImport(format, filesContent);

        const transactions = await TransactionService.prepareImport(prepared);
        //const transactionModels = transactions
        const transactionModels = transactions.map(
            (trx, i): TransactionViewModel => ({
                ...trx,
                id: i + 1,
                isSelectedForImport:
                    !trx.isAlreadyImported &&
                    (trx.savedMemo?.isImported ?? true),
            })
        );
        this.setTransactions(transactionModels);
    }

    public UpdateTransactionCategory(
        rowNum: number,
        category: CategoryOrUncategorized
    ): void {
        const id = rowNum - 1;
        if (this.Transcations[id]) {
            const newTransactions = [...this.Transcations];
            newTransactions[id].categoryId = category.id;
            newTransactions[id].category = category;

            if (newTransactions[id].isToSaveMemo && newTransactions[id].memo)
                this.AddMemo(newTransactions[id]);

            this.setTransactions(newTransactions);
        }
    }

    public ToggleSelected(transaction: TransactionViewModel) {
        if (!transaction.id) return;
        this.SetSelected(transaction.id, !transaction.isSelectedForImport);
    }
    public SetSelected(rowNum: number, selected: boolean): void {
        const id = rowNum - 1;
        if (this.Transcations[id]) {
            const newTransactions = [...this.Transcations];
            newTransactions[id].isSelectedForImport = selected;

            if (newTransactions[id].isToSaveMemo)
                this.RemoveMemo(newTransactions[id]);

            this.setTransactions(newTransactions);
        }
    }

    public ToggleMemoSave(transaction: TransactionViewModel): void {
        if (
            !transaction.isSelectedForImport ||
            (transaction.isSelectedForImport && transaction.category)
        ) {
            if (transaction.isToSaveMemo) {
                this.RemoveMemo(transaction);
            } else {
                this.AddMemo(transaction);
            }
        }
    }
    public AddMemo(transaction: TransactionViewModel): void {
        if (!transaction.memo) return;

        const newTransactions = [...this.Transcations];
        for (const trx of newTransactions) {
            if (trx.memo === transaction.memo) {
                trx.category = transaction.category;
                trx.categoryId = transaction.category?.id;
                trx.isToSaveMemo = true;
                trx.isSelectedForImport = transaction.isSelectedForImport;
            }
        }
        this.setTransactions(newTransactions);
    }
    public RemoveMemo(transaction: TransactionViewModel): void {
        if (!transaction.memo) return;

        const newTransactions = [...this.Transcations];
        for (const t of newTransactions) {
            if (t.memo === transaction.memo) {
                t.isToSaveMemo = false;
            }
        }
        this.setTransactions(newTransactions);
    }

    public async Submit(): Promise<ImportResult | undefined> {
        const newTransactions = this.getTransactionsToSubmit();

        if (newTransactions.length === 0) return;

        const newMemos: MemoViewModel[] = this.getMemosToSubmit();

        // TODO: catch these

        const results = {
            transactionsInserted:
                await TransactionService.createBatch(newTransactions),
            memosInserted:
                newMemos.length > 0
                    ? await MemoService.patchBatch(newMemos)
                    : 0,
        };

        return results;
    }

    private getTransactionsToSubmit(): TransactionViewModel[] {
        return this.Transcations.filter((trx) => trx.isSelectedForImport).map(
            (trx) => ({
                date: trx.date,
                memo: trx.memo,
                amount: trx.amount,
                categoryId: trx.categoryId,
            })
        );
    }
    private getMemosToSubmit(): MemoViewModel[] {
        return (
            this.Transcations.filter((trx) => trx.isToSaveMemo)
                // select distinct on memo
                .filter(
                    (e, i, arr) =>
                        arr.findIndex((e2) => e2.memo === e.memo) === i
                )
                .map((trx) => ({
                    memo: trx.memo,
                    categoryId: trx.isSelectedForImport
                        ? trx.categoryId
                        : undefined,
                    isImported: trx.isSelectedForImport,
                }))
        );
    }
}

export const TransactionImportContext = createContext(
    new TransactionImportManager()
);

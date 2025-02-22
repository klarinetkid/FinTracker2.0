import { createContext } from "react";
import { FileContent } from "use-file-picker/types";
import MemoService from "../services/MemoService";
import TransactionService from "../services/TransactionService";
import Category from "../types/Category";
import ImportFormat from "../types/ImportFormat";
import MemoViewModel from "../types/MemoViewModel";
import TransactionViewModel from "../types/TransactionViewModel";
import { prepareImport } from "../utils/ImportHelper";

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

    public async PrepareImport(
        format?: ImportFormat,
        filesContent?: FileContent<ArrayBuffer>[]
    ): Promise<void> {
        if (!format || !filesContent) return;

        const prepared = prepareImport(format, filesContent);

        const transactions = await TransactionService.prepareImport(prepared);
        const transactionModels = transactions.map((t, i) => ({
            ...t,
            id: i + 1,
            selectedForImport: !t.isAlreadyImported,
        }));
        this.setTransactions(transactionModels);
    }

    public SetCategory(rowNum: number, category: Category): void {
        const id = rowNum - 1;
        if (this.Transcations[id]) {
            const newTransactions = [...this.Transcations];
            newTransactions[id].categoryId = category.id;
            newTransactions[id].category = category;

            if (newTransactions[id].isToSaveMemo && newTransactions[id].memo)
                this.AddDefault(
                    newTransactions[id].memo,
                    newTransactions[id].category
                );

            this.setTransactions(newTransactions);
        }
    }

    public SetSelected(rowNum: number, selected: boolean): void {
        const id = rowNum - 1;
        if (this.Transcations[id]) {
            const newTransactions = [...this.Transcations];
            newTransactions[id].isSelectedForImport = selected;

            //if (newTransactions[id].memo)
            //    this.RemoveDefault(newTransactions[id].memo);

            this.setTransactions(newTransactions);
        }
    }

    public AddDefault(memo: string, category: Category): void {
        const newTransactions = [...this.Transcations];
        for (const transaction of newTransactions) {
            if (transaction.memo === memo) {
                transaction.category = category;
                transaction.categoryId = category.id;
                transaction.isToSaveMemo = true;
            }
        }
        this.setTransactions(newTransactions);
    }

    public RemoveDefault(memo: string): void {
        const newTransactions = [...this.Transcations];
        for (const transaction of newTransactions) {
            if (transaction.memo === memo) {
                transaction.isToSaveMemo = false;
            }
        }
        this.setTransactions(newTransactions);
    }

    public async Submit(): Promise<number> {
        const newTransactions: TransactionViewModel[] =
            this.Transcations.filter((t) => t.isSelectedForImport).map((t) => ({
                date: t.date,
                memo: t.memo,
                amount: t.amount,
                categoryId: t.categoryId,
            }));

        if (newTransactions.length === 0) return 0;

        const newDefaults: MemoViewModel[] = this.Transcations.filter(
            (t) => t.isSelectedForImport && t.isToSaveMemo
        )
            // select distinct
            .filter(
                (e, i, arr) => arr.findIndex((e2) => e2.memo === e.memo) === i
            )
            .map((t) => ({ memo: t.memo, categoryId: t.categoryId }));

        const results = {
            transactionsInserted:
                await TransactionService.createBatch(newTransactions),
            defaultsInserted:
                newDefaults.length > 0
                    ? await MemoService.patchBatch(newDefaults)
                    : 0,
        };

        return results.transactionsInserted;
    }
}

export const TransactionImportContext = createContext(
    new TransactionImportManager()
);

import { createContext } from "react";
import ImportFileFormat from "../types/ImportFileFormat";
import { FileContent } from "use-file-picker/types";
import TransactionService from "../services/TransactionService";
import TransactionViewModel from "../types/models/TransactionViewModel";
import { prepareImport } from "../utils/ImportHelper";
import Category from "../types/Category";
import DefaultCatgorizationViewModel from "../types/models/DefaultCategorizationViewModel";

// TODO rename transactioncategory to category
export class TransactionImportManager {
    public Transcations: TransactionViewModel[];
    private setTransactions: React.Dispatch<
        React.SetStateAction<TransactionViewModel[]>
    >;
    public Defaults: DefaultCatgorizationViewModel[];
    private setDefaults: React.Dispatch<
        React.SetStateAction<DefaultCatgorizationViewModel[]>
    >;

    constructor(
        transactions?: TransactionViewModel[],
        setTransactions?: React.Dispatch<
            React.SetStateAction<TransactionViewModel[]>
        >,
        defaults?: DefaultCatgorizationViewModel[],
        setDefaults?: React.Dispatch<
            React.SetStateAction<DefaultCatgorizationViewModel[]>
        >
    ) {
        this.Transcations = transactions ?? [];
        this.setTransactions = setTransactions ?? (() => undefined);
        this.Defaults = defaults ?? [];
        this.setDefaults = setDefaults ?? (() => undefined);
    }

    public async PrepareImport(
        format?: ImportFileFormat,
        filesContent?: FileContent<ArrayBuffer>[]
    ): Promise<void> {
        if (!format || !filesContent) return;

        const prepared = prepareImport(format, filesContent);

        const transactions = await TransactionService.prepareImport(prepared);
        const transactionModels = transactions.map((t, i) => ({
            ...t,
            id: i+1,
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
            this.setTransactions(newTransactions);
        }
    }

    public SetSelected(rowNum: number, selected: boolean): void {
        const id = rowNum - 1;
        if (this.Transcations[id]) {
            const newTransactions = [...this.Transcations];
            newTransactions[id].selectedForImport = selected;

            if (newTransactions[id].memo)
                this.RemoveDefault(newTransactions[id].memo);

            console.log(newTransactions)

            this.setTransactions(newTransactions);
        }
    }

    public AddDefault(memo: string, category: Category): void {
        const newTransactions = [...this.Transcations];
        for (const transaction of newTransactions) {
            if (transaction.memo === memo) {
                transaction.category = category;
                transaction.categoryId = category.id;
                transaction.saveDefault = true;
            }
        }
        console.log(newTransactions);
        this.setTransactions(newTransactions);
    }

    public RemoveDefault(memo: string): void {
        const newTransactions = [...this.Transcations];
        for (const transaction of newTransactions) {
            if (transaction.memo === memo) {
                transaction.saveDefault = false;
            }
        }
        this.setTransactions(newTransactions);
    }
}

export const TransactionImportContext = createContext(
    new TransactionImportManager()
);

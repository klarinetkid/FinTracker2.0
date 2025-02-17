import Category from "../Category";

type TransactionViewModel = {
    id?: number;
    date?: Date;
    amount?: number;
    memo?: string;
    categoryId?: number;
    category?: Category;
    isDefaultCategorized?: boolean;
    isAlreadyImported?: boolean;

    saveDefault?: boolean;
    selectedForImport?: boolean;
};

export default TransactionViewModel;

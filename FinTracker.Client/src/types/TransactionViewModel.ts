import Category from "./Category";

type TransactionViewModel = {
    id?: number;
    date?: string;
    amount?: number;
    memo?: string;
    categoryId?: number;
    category?: Category;
    isCashTransaction?: boolean;

    isMemoCategorized?: boolean;
    isAlreadyImported?: boolean;
    isToSaveMemo?: boolean;
    isSelectedForImport?: boolean;
};

export default TransactionViewModel;

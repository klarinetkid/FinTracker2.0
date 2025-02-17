import Category from "../Category";

type TransactionViewModel = {
    id?: number;
    date?: Date;
    amount?: number;
    memo?: string;
    categoryId?: number;
    category?: Category;
    defaultCategory?: Category;
    isAlreadyImported?: boolean;
};

export default TransactionViewModel;

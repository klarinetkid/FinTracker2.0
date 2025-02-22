import Category from "./Category";

type Transaction = {
    id: number;
    date: string;
    amount: number;
    memo: string;
    categoryId?: number;
    category?: Category;
    isCashTransaction: boolean;
};

export default Transaction;

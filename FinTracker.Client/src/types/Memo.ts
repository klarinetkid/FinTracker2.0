import Category from "./Category";

type Memo = {
    id: number;
    memo: string;
    categoryId?: number;
    category?: Category;
    isImported: boolean;
};

export default Memo;

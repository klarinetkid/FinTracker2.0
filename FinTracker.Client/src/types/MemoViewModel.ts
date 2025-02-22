import Category from "./Category";

type MemoViewModel = {
    id?: number;
    memo?: string;
    categoryId?: number;
    category?: Category;
    isImported?: boolean;
};

export default MemoViewModel;

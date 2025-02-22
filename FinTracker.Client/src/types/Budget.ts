import Category from "./Category";

type Budget = {
    id: number;
    categoryId: number;
    category: Category;
    amount: number;
    effectiveDate: string;
};

export default Budget;

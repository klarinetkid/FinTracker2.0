import Category from "./Category";

type BudgetItem = {
    id: number;
    categoryId: number;
    category: Category;
    amount: number;
    effectiveDate: Date;
};

export type BudgetItemGroup = {
    category: Category;
    budgetItems: BudgetItem[];
};

export default BudgetItem;

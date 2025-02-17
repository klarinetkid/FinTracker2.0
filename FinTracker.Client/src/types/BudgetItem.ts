import Category from "./Category";

type BudgetItem = {
    id: number;
    categoryId: number;
    category: Category;
    amount: number;
    effectiveDate: Date;
    isYearly: boolean;
};

export type BudgetItemGroup = {
    category: Category;
    budgetItems: BudgetItem[];
};

export default BudgetItem;

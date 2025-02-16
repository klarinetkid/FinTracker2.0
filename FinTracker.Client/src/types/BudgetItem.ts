import Category from "./Category";

type BudgetItem = {
    id: number;
    category: Category;
    amount: number;
    effectiveDate: Date;
    isYearly: boolean;
};

export default BudgetItem;

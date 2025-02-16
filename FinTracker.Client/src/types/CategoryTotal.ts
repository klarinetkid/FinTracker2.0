import Category from "./Category";

type CategoryTotal = {
    categoryId?: number | null;
    category: Category | undefined | null;
    total: number;
    percentOfIncome: number;
    percentOfSpend: number;
    budget?: number | null;
    budgetDeviation?: number | null;
};

export default CategoryTotal;

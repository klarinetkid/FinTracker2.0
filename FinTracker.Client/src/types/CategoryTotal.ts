import Category from "./Category";

type CategoryTotal = {
    total: number;
    categoryId?: number;
    category?: Category;
    percentOfIncome?: number;
    percentOfSpend?: number;
    budget?: number;
    budgetDeviation?: number;
};

export default CategoryTotal;

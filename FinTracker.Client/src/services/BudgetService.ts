import Budget from "../types/Budget";
import BudgetViewModel from "../types/BudgetViewModel";
import Category from "../types/Category";
import Grouping from "../types/Grouping";
import BaseService from "./BaseService";

class BudgetService extends BaseService {
    constructor() {
        super("/Budgets");
    }

    getGrouped(): Promise<Grouping<Category, Budget>[]> {
        return this.get<Grouping<Category, Budget>[]>("/Grouped");
    }

    createBudget(model: BudgetViewModel): Promise<Budget> {
        return this.post<Budget>("", model);
    }

    putBudget(model: BudgetViewModel): Promise<Budget> {
        const { id, ...values } = model;
        return this.put<Budget>(`/${id}`, values);
    }

    deleteBudget(id: number): Promise<void> {
        return this.delete(`/${id}`);
    }
}

export default new BudgetService();

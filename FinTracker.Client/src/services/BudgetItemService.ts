import BudgetItem, { BudgetItemGroup } from "../types/BudgetItem";
import BudgetItemViewModel from "../types/models/BudgetItemViewModel";
import BaseService from "./baseService";

class BudgetItemService extends BaseService {
    constructor() {
        super("/BudgetItems");
    }

    getGrouped(): Promise<BudgetItemGroup[]> {
        return this.get<BudgetItemGroup[]>("/Grouped");
    }

    createBudgetItem(model: BudgetItemViewModel): Promise<BudgetItem> {
        return this.post<BudgetItem>("", model);
    }

    putBudgetItem(model: BudgetItemViewModel): Promise<BudgetItem> {
        const { id, ...values } = model;
        return this.put<BudgetItem>(`/${id}`, values);
    }

    deleteBudgetItem(id: number): Promise<void> {
        return this.delete(`/${id}`);
    }
}

export default new BudgetItemService();

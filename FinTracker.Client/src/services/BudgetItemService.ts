import BudgetItem, { BudgetItemGroup } from "../types/BudgetItem";
import BudgetItemViewModel from "../types/models/BudgetItemViewModel";
import BaseService from "./baseService";

class BudgetItemService extends BaseService {
    getGrouped(): Promise<BudgetItemGroup[]> {
        return this.get<BudgetItemGroup[]>("/BudgetItems/Grouped");
    }

    createBudgetItem(budgetItem: BudgetItemViewModel): Promise<BudgetItem> {
        return this.post<BudgetItem>("/BudgetItems", budgetItem);
    }

    putBudgetItem(budgetItem: BudgetItemViewModel): Promise<BudgetItem> {
        return this.put<BudgetItem>(
            `/BudgetItems/${budgetItem.id}`,
            budgetItem
        );
    }

    deleteBudgetItem(budgetItem: Pick<BudgetItem, "id">): Promise<void> {
        return this.delete(`/BudgetItems/${budgetItem.id}`);
    }
}

export default new BudgetItemService();

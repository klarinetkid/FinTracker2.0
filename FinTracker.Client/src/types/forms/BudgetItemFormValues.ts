import moment from "moment";
import { isEmpty } from "../../utils/StringHelper";
import BudgetItemViewModel from "../models/BudgetItemViewModel";
import BudgetItem from "../BudgetItem";

type BudgetItemFormValues = {
    id: number;
    categoryId: number | undefined;
    amount: string;
    effectiveDate: string;
};

export const BudgetItemFormDefaults = {
    id: 0,
    categoryId: undefined,
    amount: "",
    effectiveDate: moment().format("yyyy-MM-DD"),
};

// TODO: this sucks
export function BudgetFormValuesToModel(
    formValues: BudgetItemFormValues
): BudgetItemViewModel {
    return {
        ...formValues,
        amount: isEmpty(formValues.amount)
            ? undefined
            : Math.floor(parseFloat(formValues.amount) * 100) ?? undefined,
        effectiveDate: moment(formValues.effectiveDate).isValid()
            ? moment(formValues.effectiveDate).format("yyyy-MM-DD")
            : undefined,
    };
}

export function BudgetItemToFormValues(
    budgetItem: BudgetItem
): BudgetItemFormValues {
    return {
        ...budgetItem,
        amount: (budgetItem.amount / 100).toFixed(2),
        effectiveDate: moment(budgetItem.effectiveDate).format("yyyy-MM-DD"),
    };
}

export default BudgetItemFormValues;

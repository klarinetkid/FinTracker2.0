import { isEmpty } from "../../utils/StringHelper";
import { CategoryTransactionCount } from "../Category";
import CategoryViewModel from "../models/CategoryViewModel";

type CategoryFormValues = {
    id: number;
    categoryName: string;
    colour: string;
    transactionCount: number;
};

export const CategoryFormDefaults = {
    id: 0,
    categoryName: "",
    colour: "",
    transactionCount: 0,
};

// TODO: this sucks
export function CategoryFormValuesToModel(
    formValues: CategoryFormValues
): CategoryViewModel {
    return {
        ...formValues,
        categoryName: isEmpty(formValues.categoryName)
            ? undefined
            : formValues.categoryName,
        colour: isEmpty(formValues.colour) ? undefined : formValues.colour,
    };
}

export function CategoryToFormValues(
    category: CategoryTransactionCount
): CategoryFormValues {
    return category;
}

export default CategoryFormValues;

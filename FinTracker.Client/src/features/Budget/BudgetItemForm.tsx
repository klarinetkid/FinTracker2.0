import React, { SyntheticEvent } from "react";
import CategorySelector from "../../components/CategorySelector";
import Spacer from "../../components/Spacer";
import Category from "../../types/Category";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import BudgetItemFormValues from "../../types/forms/BudgetItemFormValues";

interface BudgetItemFormProps {
    formValues: BudgetItemFormValues;
    updateFormValues: (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => void;
    setFormValues: React.Dispatch<React.SetStateAction<BudgetItemFormValues>>;
    onSubmit: (event: SyntheticEvent) => void;
    onDelete: () => void;
    onCancel: () => void;
}

function BudgetItemForm(props: BudgetItemFormProps) {
    const globalDataCache = useGlobalDataCache();

    return (
        <form className="form" onSubmit={props.onSubmit}>
            <div className="drawer-content-body">
                <h2>
                    {props.formValues.id === 0 ? "New" : "Edit"} Budget Item
                </h2>

                <Spacer height={24} />

                <input name="id" type="hidden" value={props.formValues.id} />

                <div className="control-group">
                    <h4>Category</h4>
                    <CategorySelector
                        key={props.formValues.categoryId}
                        onChange={(c: Category) => {
                            props.setFormValues({
                                ...props.formValues,
                                categoryId: c.id,
                            });
                        }}
                        value={
                            globalDataCache.categories.value.filter(
                                (c) => c.id === props.formValues.categoryId
                            )[0]
                        }
                    />
                </div>

                <div className="control-group">
                    <h4>Monthly Amount</h4>
                    <input
                        name="amount"
                        type="number"
                        className="ralign"
                        value={props.formValues.amount.toString()}
                        onChange={props.updateFormValues}
                    />
                </div>

                <div className="control-group">
                    <h4>Effective Date</h4>
                    <input
                        name="effectiveDate"
                        className="ralign"
                        type="date"
                        value={props.formValues.effectiveDate}
                        onChange={props.updateFormValues}
                    />
                </div>
            </div>
            <div
                className="drawer-content-foot"
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <div>
                    {props.formValues.id === 0 ? (
                        ""
                    ) : (
                        <button
                            type="button"
                            className="button"
                            onClick={props.onDelete}
                        >
                            Delete
                        </button>
                    )}
                </div>

                <div>
                    <button
                        type="button"
                        className="button"
                        onClick={props.onCancel}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="button-fill">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}

export default BudgetItemForm;

import React, { SyntheticEvent } from "react";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import CategorySelector from "../../components/CategorySelector";
import Spacer from "../../components/Spacer";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import Category from "../../types/Category";
import BudgetItemFormValues from "../../types/forms/BudgetItemFormValues";
import Input from "../../components/Input";
import FormGroup from "../../components/FormGroup";

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
        <form onSubmit={props.onSubmit}>
            <div>
                <h2>
                    {props.formValues.id === 0 ? "New" : "Edit"} Budget Item
                </h2>

                <Spacer height={24} />

                <input name="id" type="hidden" value={props.formValues.id} />
                <FormGroup fieldName="Category">
                    <CategorySelector
                        categories={globalDataCache.categories.value}
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
                </FormGroup>

                <FormGroup fieldName="Monthly Amount">
                    <Input
                        name="amount"
                        type="number"
                        className="ralign"
                        value={props.formValues.amount.toString()}
                        onChange={props.updateFormValues}
                    />
                </FormGroup>

                <FormGroup fieldName="Effective Date">
                    <Input
                        name="effectiveDate"
                        className="ralign"
                        type="date"
                        value={props.formValues.effectiveDate}
                        onChange={props.updateFormValues}
                    />
                </FormGroup>
            </div>
            <div>
                <div>
                    <Button type="button" onClick={props.onCancel}>
                        Cancel
                    </Button>
                    <ButtonFill type="submit">Submit</ButtonFill>
                </div>
                <div>
                    {props.formValues.id === 0 ? (
                        ""
                    ) : (
                        <Button type="button" onClick={props.onDelete}>
                            Delete
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
}

export default BudgetItemForm;

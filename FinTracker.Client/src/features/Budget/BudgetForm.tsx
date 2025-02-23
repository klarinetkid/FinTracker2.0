import { SyntheticEvent } from "react";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import CategorySelector from "../../components/CategorySelector";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Spacer from "../../components/Spacer";
import { FormValues } from "../../hooks/useFormValues";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import BudgetViewModel from "../../types/BudgetViewModel";
import Category from "../../types/Category";

interface BudgetFormProps {
    formValues: FormValues<BudgetViewModel>;
    onSubmit: (event: SyntheticEvent) => void;
    onDelete: () => void;
    onCancel: () => void;
}

function BudgetForm(props: BudgetFormProps) {
    const globalDataCache = useGlobalDataCache();

    return (
        <form onSubmit={props.onSubmit}>
            <div>
                <h2>{props.formValues.values.id ? "Edit" : "New"} Budget</h2>

                <Spacer height={24} />

                <input
                    name="id"
                    type="hidden"
                    value={props.formValues.values.id ?? ""}
                />
                <FormGroup
                    fieldName="Category"
                    error={props.formValues.getFieldError("CategoryId")}
                >
                    <CategorySelector
                        categories={globalDataCache.categories.value}
                        onChange={(c: Category | undefined) => {
                            props.formValues.setValues({
                                ...props.formValues.values,
                                categoryId: c?.id,
                            });
                        }}
                        value={
                            globalDataCache.categories.value.filter(
                                (c) =>
                                    c.id === props.formValues.values.categoryId
                            )[0]
                        }
                    />
                </FormGroup>

                <FormGroup
                    fieldName="Monthly Amount"
                    error={props.formValues.getFieldError("Amount")}
                >
                    <Input
                        name="amount"
                        type="text"
                        className="ralign"
                        value={props.formValues.values.amount?.toString() ?? ""}
                        onChange={props.formValues.updateValue}
                    />
                </FormGroup>

                <FormGroup
                    fieldName="Effective Date"
                    error={props.formValues.getFieldError("EffectiveDate")}
                >
                    <Input
                        name="effectiveDate"
                        className="ralign"
                        value={props.formValues.values.effectiveDate ?? ""}
                        onChange={props.formValues.updateValue}
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
                    {props.formValues.values.id ? (
                        <Button type="button" onClick={props.onDelete}>
                            Delete
                        </Button>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </form>
    );
}

export default BudgetForm;

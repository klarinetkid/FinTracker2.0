import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import CategorySelector from "../../components/CategorySelector";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Spacer from "../../components/Spacer";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import BudgetViewModel from "../../types/BudgetViewModel";
import FormProps from "../../types/FormProps";

function BudgetForm(props: FormProps<BudgetViewModel>) {
    const { formValues, onSubmit, onDelete, onCancel } = props;

    const globalDataCache = useGlobalDataCache();

    return (
        <form onSubmit={onSubmit}>
            <div>
                <h2>{formValues.values.id ? "Edit" : "New"} Budget</h2>

                <Spacer height={24} />

                <input
                    name="id"
                    type="hidden"
                    value={formValues.values.id ?? ""}
                />
                <FormGroup
                    fieldName="Category"
                    error={formValues.getFieldError("CategoryId")}
                >
                    <CategorySelector
                        categories={globalDataCache.categories.value}
                        onChange={(c) => {
                            formValues.setValues({
                                ...formValues.values,
                                categoryId: c?.id,
                            });
                        }}
                        value={
                            globalDataCache.categories.value.filter(
                                (c) => c.id === formValues.values.categoryId
                            )[0]
                        }
                    />
                </FormGroup>

                <FormGroup
                    fieldName="Monthly Amount"
                    error={formValues.getFieldError("Amount")}
                >
                    <Input
                        name="amount"
                        type="text"
                        className="ralign"
                        value={formValues.values.amount?.toString() ?? ""}
                        onChange={formValues.updateValue}
                    />
                </FormGroup>

                <FormGroup
                    fieldName="Effective Date"
                    error={formValues.getFieldError("EffectiveDate")}
                >
                    <Input
                        name="effectiveDate"
                        className="ralign"
                        value={formValues.values.effectiveDate ?? ""}
                        onChange={formValues.updateValue}
                    />
                </FormGroup>
            </div>
            <div>
                <div>
                    <Button type="button" onClick={onCancel}>
                        Cancel
                    </Button>
                    <ButtonFill type="submit">Submit</ButtonFill>
                </div>
                <div>
                    {formValues.values.id ? (
                        <Button type="button" onClick={onDelete}>
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

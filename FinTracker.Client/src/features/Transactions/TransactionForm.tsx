import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import CategorySelector from "../../components/CategorySelector";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import FormProps from "../../types/FormProps";
import TransactionViewModel from "../../types/TransactionViewModel";

function CashTransactionForm(props: FormProps<TransactionViewModel>) {
    const { formValues, onSubmit, onDelete, onCancel } = props;

    const globalDataCache = useGlobalDataCache();

    return (
        <form onSubmit={onSubmit}>
            <div>
                <h2>
                    {formValues.values.id ? "Edit " : "Add "}
                    {formValues.values.isCashTransaction ? "Cash " : " "}
                    Transaction
                </h2>

                <FormGroup
                    fieldName="Date"
                    error={formValues.getFieldError("Date")}
                >
                    <Input
                        readOnly={!formValues.values.isCashTransaction}
                        name="date"
                        value={formValues.values.date ?? ""}
                        onChange={formValues.updateValue}
                    />
                </FormGroup>
                <FormGroup
                    fieldName="Amount"
                    error={formValues.getFieldError("Amount")}
                >
                    <Input
                        readOnly={!formValues.values.isCashTransaction}
                        type="text"
                        name="amount"
                        value={formValues.values.amount ?? ""}
                        onChange={formValues.updateValue}
                    />
                </FormGroup>
                <FormGroup
                    fieldName="Memo"
                    error={formValues.getFieldError("Memo")}
                >
                    <Input
                        readOnly={!formValues.values.isCashTransaction}
                        type="text"
                        name="memo"
                        value={formValues.values.memo ?? ""}
                        onChange={formValues.updateValue}
                    />
                </FormGroup>
                <FormGroup
                    fieldName="Category"
                    error={formValues.getFieldError("Category")}
                >
                    <CategorySelector
                        categories={globalDataCache.categories.value}
                        onChange={(c) => {
                            formValues.setValues({
                                ...formValues.values,
                                categoryId: c?.id,
                            });
                        }}
                        value={globalDataCache.getCategoryById(
                            formValues.values.categoryId
                        )}
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

export default CashTransactionForm;

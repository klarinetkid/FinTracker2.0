import { SyntheticEvent } from "react";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import CategorySelector from "../../components/CategorySelector";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import { FormValues } from "../../hooks/useFormValues";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import Category from "../../types/Category";
import TransactionViewModel from "../../types/TransactionViewModel";

interface CashTransactionFormProps {
    formValues: FormValues<TransactionViewModel>;
    onSubmit: (event: SyntheticEvent) => void;
    onDelete: () => void;
    onCancel: () => void;
}

function CashTransactionForm(props: CashTransactionFormProps) {
    const globalDataCache = useGlobalDataCache();

    return (
        <form>
            <div>
                <h2>
                    {props.formValues.values.id ? "Edit" : "Add"} Cash
                    Transaction
                </h2>

                <FormGroup fieldName="Date">
                    <Input
                        readOnly={!props.formValues.values.isCashTransaction}
                        name="date"
                        value={props.formValues.values.date ?? ""}
                        onChange={props.formValues.updateValue}
                    />
                </FormGroup>
                <FormGroup fieldName="Amount">
                    <Input
                        readOnly={!props.formValues.values.isCashTransaction}
                        type="text"
                        name="amount"
                        value={props.formValues.values.amount ?? ""}
                        onChange={props.formValues.updateValue}
                    />
                </FormGroup>
                <FormGroup fieldName="Category">
                    <CategorySelector
                        disabled={!props.formValues.values.isCashTransaction}
                        categories={globalDataCache.categories.value}
                        onChange={(c: Category | undefined) => {
                            props.formValues.setValues({
                                ...props.formValues,
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

export default CashTransactionForm;

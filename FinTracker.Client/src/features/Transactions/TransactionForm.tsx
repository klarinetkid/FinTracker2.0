import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import CategorySelector from "../../components/CategorySelector";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import FormProps from "../../types/FormProps";
import TransactionViewModel from "../../types/TransactionViewModel";
import { AmountPattern, DatePattern } from "../../utils/ValidationHelper";

function TransactionForm(props: FormProps<TransactionViewModel>) {
    const { onSubmit, onDelete, onCancel, values } = props;

    const globalDataCache = useGlobalDataCache();

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        control,
        setValue,
        watch,
    } = useForm<TransactionViewModel>({ defaultValues: values });

    useEffect(() => {
        reset(values);
    }, [values]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2>
                    {values?.id ? "Edit " : "Add "}
                    {values?.isCashTransaction ? "Cash " : " "}
                    Transaction
                </h2>

                <FormGroup fieldName="Date" error={errors.date}>
                    <Input
                        registration={register("date", {
                            required: true,
                            disabled: !values?.isCashTransaction,
                            pattern: DatePattern,
                        })}
                    />
                </FormGroup>
                <FormGroup fieldName="Amount" error={errors.amount}>
                    <Input
                        className="ralign"
                        registration={register("amount", {
                            required: true,
                            pattern: AmountPattern,
                            disabled: !values?.isCashTransaction,
                        })}
                    />
                </FormGroup>
                <FormGroup fieldName="Memo" error={errors.memo}>
                    <Input
                        registration={register("memo", {
                            required: true,
                            maxLength: 200,
                            disabled: !values?.isCashTransaction,
                        })}
                    />
                </FormGroup>
                <FormGroup fieldName="Category" error={errors.categoryId}>
                    <Controller
                        control={control}
                        name="categoryId"
                        render={({ field: { value } }) => (
                            <CategorySelector
                                categories={globalDataCache.categories.value}
                                onChange={(c) => setValue("categoryId", c?.id)}
                                value={globalDataCache.getCategoryById(value)}
                            />
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
                    {values?.id && (
                        <Button type="button" onClick={onDelete}>
                            Delete
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
}

export default TransactionForm;

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import CategorySelector from "../../components/CategorySelector";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Spacer from "../../components/Spacer";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import BudgetViewModel from "../../types/BudgetViewModel";
import FormProps from "../../types/FormProps";
import { AmountPattern, DatePattern } from "../../utils/ValidationHelper";

function BudgetForm(props: FormProps<BudgetViewModel>) {
    const { onSubmit, onCancel, onDelete, values } = props;

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        setValue,
        control,
    } = useForm<BudgetViewModel>();

    useEffect(() => {
        reset(values);
    }, [values]);

    const globalDataCache = useGlobalDataCache();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2>{values?.id ? "Edit" : "New"} Budget</h2>

                <Spacer height={24} />

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
                        rules={{
                            required: true,
                        }}
                    />
                </FormGroup>

                <FormGroup fieldName="Monthly Amount" error={errors.amount}>
                    <Input
                        className="ralign"
                        registration={register("amount", {
                            required: true,
                            pattern: AmountPattern,
                            min: {
                                value: -20_000_000,
                                message: "Cannot be less than -20,000,000.",
                            },
                            max: {
                                value: 20_000_000,
                                message: "Cannot be more than 20,000,000.",
                            },
                        })}
                    />
                </FormGroup>

                <FormGroup
                    fieldName="Effective Date"
                    error={errors.effectiveDate}
                >
                    <Input
                        registration={register("effectiveDate", {
                            required: true,
                            pattern: DatePattern,
                        })}
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

export default BudgetForm;

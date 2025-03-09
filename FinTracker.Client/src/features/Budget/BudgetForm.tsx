import { Controller, UseFormReturn } from "react-hook-form";
import CategorySelector from "../../components/CategorySelector";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Spacer from "../../components/Spacer";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import BudgetViewModel from "../../types/BudgetViewModel";
import { AmountPattern, DatePattern } from "../../utils/ValidationHelper";

interface BudgetFormProps {
    form: UseFormReturn<BudgetViewModel>;
}

function BudgetForm(props: BudgetFormProps) {
    const {
        form: {
            formState: { errors },
            register,
            control,
            setValue,
        },
    } = props;

    const globalDataCache = useGlobalDataCache();

    return (
        <>
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

            <FormGroup fieldName="Effective Date" error={errors.effectiveDate}>
                <Input
                    registration={register("effectiveDate", {
                        required: true,
                        pattern: DatePattern,
                    })}
                />
            </FormGroup>
        </>
    );
}

export default BudgetForm;

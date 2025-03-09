import { Controller } from "react-hook-form";
import CategorySelector from "../../components/CategorySelector";
import { EntityManagementFormProps } from "../../components/EntityManagementPage";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import TransactionViewModel from "../../types/TransactionViewModel";
import { AmountPattern, DatePattern } from "../../utils/ValidationHelper";

function TransactionForm(
    props: EntityManagementFormProps<TransactionViewModel>
) {
    const {
        form: {
            watch,
            formState: { errors },
            register,
            control,
            setValue,
        },
    } = props;

    const globalDataCache = useGlobalDataCache();

    const isCashTransaction = watch("isCashTransaction") === true;

    return (
        <>
            <FormGroup fieldName="Date" error={errors.date}>
                <Input
                    placeholder="yyyy-mm-dd"
                    registration={register("date", {
                        required: true,
                        disabled: !isCashTransaction,
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
                        disabled: !isCashTransaction,
                    })}
                />
            </FormGroup>
            <FormGroup fieldName="Memo" error={errors.memo}>
                <Input
                    registration={register("memo", {
                        required: true,
                        maxLength: 200,
                        disabled: !isCashTransaction,
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
        </>
    );
}

export default TransactionForm;

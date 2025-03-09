import { Controller } from "react-hook-form";
import CategorySelector from "../../components/CategorySelector";
import { EntityManagementFormProps } from "../../components/EntityManagementPage";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Spacer from "../../components/Spacer";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import { NeverImport } from "../../types/Category";
import MemoViewModel from "../../types/MemoViewModel";

function MemoForm(props: EntityManagementFormProps<MemoViewModel>) {
    const {
        form: {
            formState: { errors },
            setValue,
            control,
            watch,
        },
    } = props;

    const globalDataCache = useGlobalDataCache();

    const catSelectorValue = watch("isImported")
        ? globalDataCache.getCategoryById(watch("categoryId"))
        : NeverImport;

    return (
        <>
            <Spacer height={24} />

            <FormGroup fieldName="Memo">
                <Input readOnly name="memo" value={watch("memo")} />
            </FormGroup>
            <FormGroup fieldName="Category" error={errors.categoryId}>
                <Controller
                    control={control}
                    name="categoryId"
                    render={() => (
                        <CategorySelector
                            disabled={!watch("isImported")}
                            categories={globalDataCache.categories.value}
                            onChange={(c) => setValue("categoryId", c?.id)}
                            value={catSelectorValue}
                        />
                    )}
                    rules={{
                        required: true,
                    }}
                />
            </FormGroup>
        </>
    );
}

export default MemoForm;

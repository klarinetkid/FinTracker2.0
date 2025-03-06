import { Controller, useForm } from "react-hook-form";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import CategorySelector from "../../components/CategorySelector";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Spacer from "../../components/Spacer";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import { NeverImport } from "../../types/Category";
import FormProps from "../../types/FormProps";
import MemoViewModel from "../../types/MemoViewModel";
import { useEffect } from "react";

function MemoForm(props: FormProps<MemoViewModel>) {
    const { onSubmit, onDelete, onCancel, values } = props;

    const {
        formState: { errors },
        handleSubmit,
        reset,
        setValue,
        control,
        watch,
    } = useForm<MemoViewModel>();

    useEffect(() => {
        reset(values);
    }, [values]);

    const globalDataCache = useGlobalDataCache();

    const catSelectorValue = values?.isImported
        ? globalDataCache.getCategoryById(watch("categoryId"))
        : NeverImport;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2>Edit Memo</h2>

                <Spacer height={24} />

                <FormGroup fieldName="Memo">
                    <Input
                        readOnly
                        name="memo"
                        className="ralign"
                        value={values?.memo ?? ""}
                    />
                </FormGroup>
                <FormGroup fieldName="Category" error={errors.categoryId}>
                    <Controller
                        control={control}
                        name="categoryId"
                        render={() => (
                            <CategorySelector
                                disabled={!values?.isImported}
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
            </div>
            <div>
                <div>
                    <Button type="button" onClick={onCancel}>
                        Cancel
                    </Button>
                    <ButtonFill type="submit" disabled={!values?.isImported}>
                        Submit
                    </ButtonFill>
                </div>
                <div>
                    <Button type="button" onClick={onDelete}>
                        Delete
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default MemoForm;

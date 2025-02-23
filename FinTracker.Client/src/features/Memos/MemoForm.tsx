import { SyntheticEvent } from "react";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import CategorySelector from "../../components/CategorySelector";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Spacer from "../../components/Spacer";
import { FormValues } from "../../hooks/useFormValues";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import Category, { NeverImport } from "../../types/Category";
import MemoViewModel from "../../types/MemoViewModel";

interface MemoFormProps {
    formValues: FormValues<MemoViewModel>;
    onSubmit: (event: SyntheticEvent) => void;
    onDelete: () => void;
    onCancel: () => void;
}

function MemoForm(props: MemoFormProps) {
    const globalDataCache = useGlobalDataCache();

    const catSelectorValue = props.formValues.values.isImported
        ? globalDataCache.categories.value.filter(
              (c) => c.id === props.formValues.values.categoryId
          )[0]
        : NeverImport;

    return (
        <form onSubmit={props.onSubmit}>
            <div>
                <h2>Edit Memo</h2>

                <Spacer height={24} />

                <input
                    name="id"
                    type="hidden"
                    value={props.formValues.values.id ?? 0}
                />
                <FormGroup fieldName="Memo">
                    <Input
                        readOnly
                        name="memo"
                        className="ralign"
                        value={props.formValues.values.memo ?? ""}
                    />
                </FormGroup>
                <FormGroup fieldName="Category">
                    <CategorySelector
                        categories={globalDataCache.categories.value}
                        value={catSelectorValue}
                        disabled={!props.formValues.values.isImported}
                        onChange={(c: Category | undefined) => {
                            props.formValues.setValues({
                                ...props.formValues.values,
                                categoryId: c?.id,
                            });
                        }}
                    />
                </FormGroup>
            </div>
            <div>
                <div>
                    <Button type="button" onClick={props.onCancel}>
                        Cancel
                    </Button>
                    <ButtonFill
                        type="submit"
                        disabled={!props.formValues.values.isImported}
                    >
                        Submit
                    </ButtonFill>
                </div>
                <div>
                    <Button type="button" onClick={props.onDelete}>
                        Delete
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default MemoForm;

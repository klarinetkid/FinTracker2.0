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

function MemoForm(props: FormProps<MemoViewModel>) {
    const { formValues, onSubmit, onDelete, onCancel } = props;

    const globalDataCache = useGlobalDataCache();

    const catSelectorValue = formValues.values.isImported
        ? globalDataCache.categories.value.filter(
              (c) => c.id === formValues.values.categoryId
          )[0]
        : NeverImport;

    return (
        <form onSubmit={onSubmit}>
            <div>
                <h2>Edit Memo</h2>

                <Spacer height={24} />

                <input
                    name="id"
                    type="hidden"
                    value={formValues.values.id ?? 0}
                />
                <FormGroup fieldName="Memo">
                    <Input
                        readOnly
                        name="memo"
                        className="ralign"
                        value={formValues.values.memo ?? ""}
                    />
                </FormGroup>
                <FormGroup fieldName="Category">
                    <CategorySelector
                        categories={globalDataCache.categories.value}
                        value={catSelectorValue}
                        disabled={!formValues.values.isImported}
                        onChange={(c) => {
                            formValues.setValues({
                                ...formValues.values,
                                categoryId: c?.id,
                            });
                        }}
                    />
                </FormGroup>
            </div>
            <div>
                <div>
                    <Button type="button" onClick={onCancel}>
                        Cancel
                    </Button>
                    <ButtonFill
                        type="submit"
                        disabled={!formValues.values.isImported}
                    >
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

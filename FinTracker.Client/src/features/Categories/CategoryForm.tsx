import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import CategoryPill from "../../components/CategoryPill";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Spacer from "../../components/Spacer";
import { Total } from "../../types/Category";
import CategoryViewModel from "../../types/CategoryViewModel";
import FormProps from "../../types/FormProps";

function CategoryForm(props: FormProps<CategoryViewModel>) {
    const { formValues, onSubmit, onDelete, onCancel } = props;

    return (
        <form onSubmit={onSubmit}>
            <div>
                <h2>{formValues.values.id ? "Edit" : "New"} Category</h2>

                <CategoryPill
                    category={{
                        id: 1,
                        categoryName:
                            formValues.values.categoryName || "New Category",
                        colour: formValues.values.colour || Total.colour,
                    }}
                />
                <Spacer height={24} />

                <input
                    name="id"
                    type="hidden"
                    value={formValues.values.id ?? ""}
                />
                <FormGroup
                    fieldName="Category Name"
                    error={formValues.getFieldError("CategoryName")}
                >
                    <Input
                        name="categoryName"
                        value={formValues.values.categoryName ?? ""}
                        onChange={formValues.updateValue}
                    />
                </FormGroup>
                <FormGroup
                    fieldName="Colour"
                    error={formValues.getFieldError("Colour")}
                >
                    <Input
                        name="colour"
                        value={formValues.values.colour ?? ""}
                        onChange={formValues.updateValue}
                    />
                </FormGroup>
            </div>
            <div>
                <div>
                    <Button type="button" onClick={onCancel}>
                        Cancel
                    </Button>
                    <ButtonFill type="submit" onClick={onSubmit}>
                        Submit
                    </ButtonFill>
                </div>
                <div>
                    {formValues.values.id ? (
                        <Button
                            type="button"
                            disabled={formValues.values.transactionCount > 0}
                            onClick={onDelete}
                            title={
                                formValues.values.transactionCount === 0
                                    ? ""
                                    : "Cannot be deleted as category has linked transactions."
                            }
                        >
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

export default CategoryForm;

import { SyntheticEvent } from "react";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import CategoryPill from "../../components/CategoryPill";
import Spacer from "../../components/Spacer";
import { Total } from "../../types/Category";
import CategoryFormValues from "../../types/forms/CategoryFormValues";
import Input from "../../components/Input";
import FormGroup from "../../components/FormGroup";

interface CategoryFormProps {
    formValues: CategoryFormValues;
    updateFormValues: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: SyntheticEvent) => void;
    onDelete: () => void;
    onCancel: () => void;
}

function CategoryForm(props: CategoryFormProps) {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                <h2>{props.formValues.id === 0 ? "New" : "Edit"} Category</h2>

                <CategoryPill
                    category={{
                        id: 1,
                        categoryName:
                            props.formValues.categoryName || "New Category",
                        colour: props.formValues.colour || Total.colour,
                    }}
                />
                <Spacer height={24} />

                <input name="id" type="hidden" value={props.formValues.id} />
                <FormGroup fieldName="Category Name">
                    <Input
                        name="categoryName"
                        value={props.formValues.categoryName}
                        onChange={props.updateFormValues}
                    />
                </FormGroup>
                <FormGroup fieldName="Colour">
                    <Input
                        name="colour"
                        value={props.formValues.colour}
                        onChange={props.updateFormValues}
                    />
                </FormGroup>
            </div>
            <div>
                <div>
                    <Button type="button" onClick={props.onCancel}>
                        Cancel
                    </Button>
                    <ButtonFill type="submit" onClick={props.onSubmit}>
                        Submit
                    </ButtonFill>
                </div>
                <div>
                    {props.formValues.id === 0 ? (
                        ""
                    ) : (
                        <Button
                            type="button"
                            disabled={props.formValues.transactionCount > 0}
                            onClick={props.onDelete}
                            title={
                                props.formValues.transactionCount === 0
                                    ? ""
                                    : "Cannot be deleted as category has linked transactions."
                            }
                        >
                            Delete
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
}

export default CategoryForm;

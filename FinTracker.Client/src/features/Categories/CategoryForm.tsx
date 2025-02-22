import { SyntheticEvent, useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import CategoryPill from "../../components/CategoryPill";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Spacer from "../../components/Spacer";
import { FormValues } from "../../hooks/useFormValues";
import { Total } from "../../types/Category";
import CategoryViewModel from "../../types/CategoryViewModel";

interface CategoryFormProps {
    formValues: FormValues<CategoryViewModel>;
    onSubmit: (event: SyntheticEvent) => void;
    onDelete: () => void;
    onCancel: () => void;
}

function CategoryForm(props: CategoryFormProps) {
    const [isColourValid, setIsColourValid] = useState(true);

    useEffect(() => {
        if (
            props.formValues.values &&
            props.formValues.values.colour &&
            props.formValues.values.colour.trim().length > 0
        )
            setIsColourValid(
                tinycolor(props.formValues.values.colour).isValid()
            );
    }, [props.formValues.values.colour]);

    return (
        <form onSubmit={props.onSubmit}>
            <div>
                <h2>{props.formValues.values.id ? "Edit" : "New"} Category</h2>

                <CategoryPill
                    category={{
                        id: 1,
                        categoryName:
                            props.formValues.values.categoryName ||
                            "New Category",
                        colour: props.formValues.values.colour || Total.colour,
                    }}
                />
                <Spacer height={24} />

                <input
                    name="id"
                    type="hidden"
                    value={props.formValues.values.id ?? ""}
                />
                <FormGroup
                    fieldName="Category Name"
                    error={props.formValues.getFieldError("CategoryName")}
                >
                    <Input
                        name="categoryName"
                        value={props.formValues.values.categoryName ?? ""}
                        onChange={props.formValues.updateValue}
                    />
                </FormGroup>
                <FormGroup
                    fieldName="Colour"
                    error={props.formValues.getFieldError("Colour")}
                >
                    <Input
                        name="colour"
                        isError={!isColourValid}
                        value={props.formValues.values.colour ?? ""}
                        onChange={props.formValues.updateValue}
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
                    {props.formValues.values.id ? (
                        <Button
                            type="button"
                            disabled={
                                props.formValues.values.transactionCount > 0
                            }
                            onClick={props.onDelete}
                            title={
                                props.formValues.values.transactionCount === 0
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

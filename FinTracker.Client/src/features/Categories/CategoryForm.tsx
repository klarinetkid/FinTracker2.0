import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import CategoryPill from "../../components/CategoryPill";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Spacer from "../../components/Spacer";
import { Total } from "../../types/Category";
import CategoryViewModel from "../../types/CategoryViewModel";
import FormProps from "../../types/FormProps";
import Tooltip from "../../components/Tooltip";

function CategoryForm(props: FormProps<CategoryViewModel>) {
    const { onSubmit, onCancel, onDelete, values } = props;

    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<CategoryViewModel>();

    useEffect(() => {
        reset(values);
    }, [values]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2>{values?.id ? "Edit" : "New"} Category</h2>

                <CategoryPill
                    category={{
                        id: 1,
                        categoryName: watch("categoryName") || "New Category",
                        colour: watch("colour") || Total.colour,
                    }}
                />
                <Spacer height={24} />

                <FormGroup
                    fieldName="Category Name"
                    error={errors.categoryName}
                >
                    <Input
                        registration={register("categoryName", {
                            required: true,
                            maxLength: 40,
                        })}
                    />
                </FormGroup>
                <FormGroup fieldName="Colour" error={errors.colour}>
                    <Input
                        registration={register("colour", {
                            required: true,
                            maxLength: 25,
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
                        <Button
                            type="button"
                            disabled={values?.transactionCount !== 0}
                            onClick={onDelete}
                        >
                            Delete

                            {values?.transactionCount !== 0 && (
                                <Tooltip>
                                    Categories with linked transactions cannot be deleted.
                                </Tooltip>
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
}

export default CategoryForm;

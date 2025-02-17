import { SyntheticEvent } from "react";
import CategoryPill from "../../components/CategoryPill";
import Spacer from "../../components/Spacer";
import { Total } from "../../types/Category";
import CategoryFormValues from "../../types/forms/CategoryFormValues";

interface CategoryFormProps {
    formValues: CategoryFormValues;
    updateFormValues: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: SyntheticEvent) => void;
    onDelete: () => void;
    onCancel: () => void;
}

function CategoryForm(props: CategoryFormProps) {
    return (
        <form className="form" onSubmit={props.onSubmit}>
            <div className="drawer-content-body">
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
                <div className="control-group">
                    <h4>Category Name</h4>
                    <input
                        name="categoryName"
                        value={props.formValues.categoryName}
                        onChange={props.updateFormValues}
                    />
                </div>
                <div className="control-group">
                    <h4>Colour</h4>
                    <input
                        name="colour"
                        value={props.formValues.colour}
                        onChange={props.updateFormValues}
                    />
                </div>
            </div>
            <div
                className="drawer-content-foot"
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <div>
                    {props.formValues.id === 0 ? (
                        ""
                    ) : (
                        <button
                            className="button"
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
                        </button>
                    )}
                </div>

                <div>
                    <button
                        type="button"
                        className="button"
                        onClick={props.onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="button-fill"
                        onClick={props.onSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}

export default CategoryForm;

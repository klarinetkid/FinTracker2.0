import { UseFormReturn } from "react-hook-form";
import CategoryPill from "../../components/CategoryPill";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Spacer from "../../components/Spacer";
import CategoryReferenceCounts from "../../types/CategoryReferenceCounts";
import { Total } from "../../types/Category";

interface CategoryForm2Props {
    form: UseFormReturn<CategoryReferenceCounts>;
}

function CategoryForm2(props: CategoryForm2Props) {
    const {
        form: {
            watch,
            formState: { errors },
            register,
        },
    } = props;

    return (
        <>
            <CategoryPill
                category={{
                    id: 1,
                    categoryName: watch("categoryName") || "New Category",
                    colour: watch("colour") || Total.colour,
                }}
            />
            <Spacer height={24} />

            <FormGroup fieldName="Category Name" error={errors.categoryName}>
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
        </>
    );
}

export default CategoryForm2;

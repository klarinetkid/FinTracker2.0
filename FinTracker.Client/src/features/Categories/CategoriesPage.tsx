import { SyntheticEvent, useEffect, useState } from "react";
import Drawer from "../../components/Drawer";
import useFormValues from "../../hooks/useFormValues";
import CategoryService from "../../services/CategoryService";
import AddIcon from "../../assets/Add_round_fill_light.svg?react";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";
import { CategoryTransactionCount } from "../../types/Category";
import IconButton from "../../components/IconButton";
import CategoryFormValues, {
    CategoryFormDefaults,
    CategoryFormValuesToModel,
    CategoryToFormValues,
} from "../../types/forms/CategoryFormValues";
import Page from "../../components/Page";
import Row from "../../components/Row";

function CategoriesPage() {
    const [categories, setCategories] = useState<CategoryTransactionCount[]>(
        []
    );
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isRefreshed, setIsRefreshed] = useState(false);

    const [formValues, setFormValues, updateFormValues] =
        useFormValues<CategoryFormValues>(CategoryFormDefaults);

    useEffect(() => {
        CategoryService.getCategoryTransactionCounts().then(setCategories);
    }, [isRefreshed]);

    return (
        <Page width={600}>
            <Row justifyContent="space-between">
                <h1>Categories</h1>
                <IconButton
                    title="New category"
                    icon={AddIcon}
                    onClick={newCategory}
                />
            </Row>

            <CategoryTable
                categories={categories}
                editCategory={editCategory}
            />

            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                <CategoryForm
                    formValues={formValues}
                    updateFormValues={updateFormValues}
                    onCancel={() => setIsDrawerOpen(false)}
                    onDelete={deleteCategory}
                    onSubmit={submitCategory}
                />
            </Drawer>
        </Page>
    );

    function newCategory() {
        setFormValues(CategoryFormDefaults);
        setIsDrawerOpen(true);
    }
    function editCategory(category: CategoryTransactionCount) {
        setFormValues(CategoryToFormValues(category));
        setIsDrawerOpen(true);
    }
    async function submitCategory(event: SyntheticEvent) {
        event.preventDefault();

        const model = CategoryFormValuesToModel(formValues);

        if (formValues.id === 0) {
            await CategoryService.createCategory(model);
        } else {
            await CategoryService.putCategory(model);
        }
        document.activeElement.blur(); // TODO: is there a better way to do this?
        setIsRefreshed(!isRefreshed);
        setIsDrawerOpen(false);
    }
    async function deleteCategory() {
        await CategoryService.deleteCategory(formValues.id);
        setIsRefreshed(!isRefreshed);
        setIsDrawerOpen(false);
    }
}

export default CategoriesPage;

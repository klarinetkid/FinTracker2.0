import { SyntheticEvent, useEffect, useState } from "react";
import Drawer from "../../components/Drawer";
import IconButton from "../../components/IconButton";
import Page from "../../components/Page";
import Row from "../../components/Row";
import { useFormValues } from "../../hooks/useFormValues";
import CategoryService from "../../services/CategoryService";
import { CategoryTransactionCount } from "../../types/Category";
import CategoryViewModel from "../../types/CategoryViewModel";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../services/baseService";
import { AddRoundLightFillIcon } from "../../utils/Icons";

function CategoriesPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isRefreshed, setIsRefreshed] = useState(false);
    const formValues = useFormValues<CategoryViewModel>({});
    const [categories, setCategories] = useState<CategoryTransactionCount[]>(
        []
    );

    useEffect(() => {
        CategoryService.getCategoryTransactionCounts().then(setCategories);
    }, [isRefreshed]);

    return (
        <Page width={800}>
            <Row justifyContent="space-between">
                <h1>Categories</h1>
                <IconButton
                    title="New category"
                    icon={AddRoundLightFillIcon}
                    onClick={() => openCategoryForm({})}
                />
            </Row>

            <CategoryTable
                categories={categories}
                editCategory={(c) => openCategoryForm(c)}
            />

            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                <CategoryForm
                    formValues={formValues}
                    onCancel={() => setIsDrawerOpen(false)}
                    onDelete={deleteCategory}
                    onSubmit={submitCategory}
                />
            </Drawer>
        </Page>
    );

    function openCategoryForm(category: CategoryViewModel) {
        formValues.setErrors(undefined);
        formValues.setValues(category);
        setIsDrawerOpen(true);
    }
    function submitCategory(event: SyntheticEvent) {
        event.preventDefault();

        if (!formValues.values) return;

        (formValues.values.id
            ? CategoryService.putCategory(formValues.values)
            : CategoryService.createCategory(formValues.values)
        )
            .then(() => {
                if (event.target instanceof HTMLButtonElement) event.target.blur();
                setIsRefreshed(!isRefreshed);
                setIsDrawerOpen(false);
            })
            .catch((error: AxiosError<ErrorResponse>) => {
                formValues.setErrors(error.response?.data);
            });
    }
    async function deleteCategory() {
        if (!formValues.values.id) return;
        await CategoryService.deleteCategory(formValues.values.id);
        setIsRefreshed(!isRefreshed);
        setIsDrawerOpen(false);
    }
}

export default CategoriesPage;

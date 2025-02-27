import { AxiosError } from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import Drawer from "../../components/Drawer";
import IconButton from "../../components/IconButton";
import Page from "../../components/Page";
import Row from "../../components/Row";
import { useFormValues } from "../../hooks/useFormValues";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import { ErrorResponse } from "../../services/BaseService";
import CategoryService from "../../services/CategoryService";
import { CategoryTransactionCount } from "../../types/Category";
import CategoryViewModel from "../../types/CategoryViewModel";
import { AddRoundLightFillIcon } from "../../utils/Icons";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";
import useRefresh from "../../hooks/useRefresh";
import StatusIndicator from "../../components/StatusIndicator";

function CategoriesPage() {
    const globalDataCache = useGlobalDataCache();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { refreshed, refresh } = useRefresh();
    const formValues = useFormValues<CategoryViewModel>({});
    const [categories, setCategories] = useState<CategoryTransactionCount[]>();

    useEffect(() => {
        globalDataCache.categories.refresh();
        CategoryService.getCategoryTransactionCounts().then(setCategories);
    }, [refreshed]);

    return (
        <Page>
            <Row justifyContent="space-between">
                <h1>Categories</h1>
                <IconButton
                    title="New category"
                    icon={AddRoundLightFillIcon}
                    onClick={() => openCategoryForm({})}
                />
            </Row>

            {categories ? (
                <CategoryTable
                    categories={categories}
                    editCategory={(c) => openCategoryForm(c)}
                />
            ) : (
                <StatusIndicator status="loading" />
            )}

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
                if (event.target instanceof HTMLButtonElement)
                    event.target.blur();
                refresh();
                setIsDrawerOpen(false);
            })
            .catch((error: AxiosError<ErrorResponse>) => {
                formValues.setErrors(error.response?.data);
            });
    }
    async function deleteCategory() {
        if (!formValues.values.id) return;
        await CategoryService.deleteCategory(formValues.values.id);
        refresh();
        setIsDrawerOpen(false);
    }
}

export default CategoriesPage;

import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import Drawer from "../../components/Drawer";
import IconButton from "../../components/IconButton";
import Page from "../../components/Page";
import Row from "../../components/Row";
import StatusIndicator from "../../components/StatusIndicator";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import useRefresh from "../../hooks/useRefresh";
import CategoryService from "../../services/CategoryService";
import { CategoryTransactionCount } from "../../types/Category";
import CategoryViewModel from "../../types/CategoryViewModel";
import { AddCategoryIcon } from "../../utils/Icons";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";

function CategoriesPage() {
    const globalDataCache = useGlobalDataCache();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { refreshed, refresh } = useRefresh();
    const [categories, setCategories] = useState<CategoryTransactionCount[]>();
    const [editingValues, setEditingValues] = useState<CategoryViewModel>();

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
                    icon={AddCategoryIcon}
                    onClick={() => openCategoryForm(undefined)}
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
                    onCancel={() => setIsDrawerOpen(false)}
                    onDelete={deleteCategory}
                    onSubmit={submitCategory}
                    values={editingValues}
                />
            </Drawer>
        </Page>
    );

    function openCategoryForm(category: CategoryViewModel | undefined) {
        setEditingValues(category);
        setIsDrawerOpen(true);
    }
    function submitCategory(model: FieldValues) {
        (model.id
            ? CategoryService.putCategory(model)
            : CategoryService.createCategory(model)
        ).then(() => {
            refresh();
            setIsDrawerOpen(false);
        });
    }
    async function deleteCategory() {
        if (!editingValues?.id) return;
        await CategoryService.deleteCategory(editingValues.id);
        refresh();
        setIsDrawerOpen(false);
    }
}

export default CategoriesPage;

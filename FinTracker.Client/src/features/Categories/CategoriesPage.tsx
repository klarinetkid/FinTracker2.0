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
import { blurActiveElement } from "../../utils/HtmlHelper";
import { AddCategoryIcon } from "../../utils/Icons";
import ToastManager from "../../utils/ToastManager";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";
import ConfirmationPopup from "../../components/ConfirmationPopup";

function CategoriesPage() {
    const globalDataCache = useGlobalDataCache();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
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
                    onClick={newCategory}
                />
            </Row>

            {categories ? (
                <CategoryTable
                    categories={categories}
                    editCategory={(c) => editCategory(c)}
                />
            ) : (
                <StatusIndicator status="loading" />
            )}

            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                <CategoryForm
                    onCancel={() => setIsDrawerOpen(false)}
                    onDelete={() => setIsConfirmingDelete(true)}
                    onSubmit={submitCategory}
                    values={editingValues}
                />
            </Drawer>

            {isConfirmingDelete && (
                <ConfirmationPopup
                    onCancel={() => setIsConfirmingDelete(false)}
                    body={"Deleting a category cannot be undone."}
                    onConfirm={deleteCategory}
                />
            )}
        </Page>
    );
    function newCategory() {
        setEditingValues({
            categoryName: "",
            colour: "",
        });
        setIsDrawerOpen(true);
    }
    function editCategory(category: CategoryViewModel) {
        setEditingValues({ ...category });
        setIsDrawerOpen(true);
    }
    function submitCategory(model: FieldValues) {
        (model.id
            ? CategoryService.putCategory(model)
            : CategoryService.createCategory(model)
        ).then(() => {
            blurActiveElement();
            refresh();
            setIsDrawerOpen(false);
            ToastManager.addToast({
                type: "success",
                title: "Success",
                body: "The category was successfully saved.",
            });
        });
    }
    async function deleteCategory() {
        if (!editingValues?.id) return;
        await CategoryService.deleteCategory(editingValues.id);
        blurActiveElement();
        refresh();
        setIsConfirmingDelete(false);
        setIsDrawerOpen(false);
        ToastManager.addToast({
            type: "success",
            title: "Success",
            body: "The category was successfully deleted.",
        });
    }
}

export default CategoriesPage;

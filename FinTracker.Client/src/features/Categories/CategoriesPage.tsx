import { useEffect, useState } from "react";
import Drawer from "../../components/Drawer";
import useFormValues from "../../hooks/useFormValues";
import CategoryService from "../../services/CategoryService";
import CategoryTransactionCount from "../../types/CategoryTransactionCount";
import AddIcon from "../../assets/Add_round_fill_light.svg?react";
import CategoryForm, { CategoryFormValues } from "./CategoryForm";
import CategoryTable from "./CategoryTable";

function CategoriesPage() {
    const [categories, setCategories] = useState<CategoryTransactionCount[]>(
        []
    );
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isRefreshed, setIsRefreshed] = useState(false);

    const [formValues, setFormValues, updateFormValues] =
        useFormValues<CategoryFormValues>({
            id: 0,
            categoryName: "",
            colour: "",
            transactionCount: 0,
        });

    useEffect(() => {
        CategoryService.getCategoryTransactionCounts().then(setCategories);
    }, [isRefreshed]);

    return (
        <div className="page" style={{ width: 600 }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div></div>
                <h1>Categories</h1>
                <div>
                    <AddIcon width={36} height={36} onClick={newCategory} />
                </div>
            </div>

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
        </div>
    );

    function newCategory() {
        setFormValues({
            id: 0,
            categoryName: "",
            colour: "",
            transactionCount: -1,
        });
        setIsDrawerOpen(true);
    }
    function editCategory(category: CategoryTransactionCount) {
        setFormValues(category);
        setIsDrawerOpen(true);
    }
    async function submitCategory(event) {
        event.preventDefault();

        if (formValues.id === 0) {
            await CategoryService.createCategory(formValues);
        } else {
            await CategoryService.patchCategory(formValues);
        }

        setIsRefreshed(!isRefreshed);
        setIsDrawerOpen(false);
    }
    async function deleteCategory() {
        await CategoryService.deleteCategory(formValues);
        setIsRefreshed(!isRefreshed);
        setIsDrawerOpen(false);
    }
}

export default CategoriesPage;

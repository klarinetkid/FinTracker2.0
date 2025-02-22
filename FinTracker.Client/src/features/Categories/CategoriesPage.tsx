import { SyntheticEvent, useEffect, useState } from "react";
import AddIcon from "../../assets/Add_round_fill_light.svg?react";
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

function CategoriesPage() {
    const [categories, setCategories] = useState<CategoryTransactionCount[]>(
        []
    );
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isRefreshed, setIsRefreshed] = useState(false);
    const formValues = useFormValues<CategoryViewModel>({});

    useEffect(() => {
        CategoryService.getCategoryTransactionCounts().then(setCategories);
    }, [isRefreshed]);

    return (
        <Page width={800}>
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
                    onCancel={() => setIsDrawerOpen(false)}
                    onDelete={deleteCategory}
                    onSubmit={submitCategory}
                />
            </Drawer>
        </Page>
    );

    function newCategory() {
        formValues.setErrors(undefined);
        formValues.setValues({});
        setIsDrawerOpen(true);
    }
    function editCategory(category: CategoryTransactionCount) {
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

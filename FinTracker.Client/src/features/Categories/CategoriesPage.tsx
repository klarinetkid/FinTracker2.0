import { UseFormReturn } from "react-hook-form";
import EntityManagementPage from "../../components/EntityManagementPage";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import CategoryService from "../../services/CategoryService";
import CategoryReferenceCounts from "../../types/CategoryReferenceCounts";
import { AddCategoryIcon } from "../../utils/Icons";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";
import StatusIndicator from "../../components/StatusIndicator";

function CategoriesPage() {
    const globalDataCache = useGlobalDataCache();

    const newCategoryDefaults = {
        categoryName: "",
        colour: "",
    };

    return (
        <EntityManagementPage
            title="Categories"
            entityName="category"
            getEntities={getCategories}
            newEntityDefaults={newCategoryDefaults as CategoryReferenceCounts}
            newEntityIcon={AddCategoryIcon}
            addEntity={CategoryService.createCategory.bind(CategoryService)}
            putEntity={CategoryService.putCategory.bind(CategoryService)}
            deleteEntity={CategoryService.deleteCategory.bind(CategoryService)}
            canBeDeleted={canBeDeleted}
            renderTable={renderTable}
            renderForm={renderForm}
        />
    );

    function getCategories() {
        globalDataCache.categories.refresh();
        return CategoryService.getCategoryTransactionCounts();
    }

    function renderTable(
        categories: CategoryReferenceCounts[] | undefined,
        edit: (c: CategoryReferenceCounts) => void
    ) {
        return !categories ? (
            <StatusIndicator status="loading" />
        ) : (
            <CategoryTable
                categories={categories}
                editCategory={(c) => edit(c)}
            />
        );
    }

    function renderForm(form: UseFormReturn<CategoryReferenceCounts>) {
        return <CategoryForm form={form} />;
    }

    function canBeDeleted(values: CategoryReferenceCounts) {
        return (
            values.transactionCount === 0 &&
            values.budgetCount === 0 &&
            values.memoCount === 0
        );
    }
}

export default CategoriesPage;

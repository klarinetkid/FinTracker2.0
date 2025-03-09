import EntityManagementPage from "../../components/EntityManagementPage";
import StatusIndicator from "../../components/StatusIndicator";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import CategoryService from "../../services/CategoryService";
import CategoryReferenceCounts from "../../types/CategoryReferenceCounts";
import { AddCategoryIcon } from "../../utils/Icons";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";

function CategoriesPage() {
    const globalDataCache = useGlobalDataCache();

    const newCategoryDefaults = {
        categoryName: "",
        colour: "",
    };

    return (
        <EntityManagementPage
            entityPluralName="Categories"
            entitySingularName="category"
            newEntityDefaults={newCategoryDefaults as CategoryReferenceCounts}
            newEntityIcon={AddCategoryIcon}
            getEntities={() => {
                globalDataCache.categories.refresh();
                return CategoryService.getCategoryTransactionCounts();
            }}
            addEntity={CategoryService.createCategory.bind(CategoryService)}
            putEntity={CategoryService.putCategory.bind(CategoryService)}
            deleteEntity={CategoryService.deleteCategory.bind(CategoryService)}
            canBeDeleted={canBeDeleted}
            renderTable={renderTable}
            renderForm={(form) => <CategoryForm form={form} />}
        />
    );

    function renderTable(
        categories: CategoryReferenceCounts[] | undefined,
        edit: (c: CategoryReferenceCounts) => void
    ) {
        return categories ? (
            <CategoryTable
                categories={categories}
                editCategory={(c) => edit(c)}
            />
        ) : (
            <StatusIndicator status="loading" />
        );
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

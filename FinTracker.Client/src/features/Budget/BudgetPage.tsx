import moment from "moment";
import { UseFormReturn } from "react-hook-form";
import EntityManagementPage from "../../components/EntityManagementPage";
import StatusIndicator from "../../components/StatusIndicator";
import BudgetService from "../../services/BudgetService";
import Budget from "../../types/Budget";
import BudgetViewModel from "../../types/BudgetViewModel";
import Category from "../../types/Category";
import Grouping from "../../types/Grouping";
import { formatDateOnly } from "../../utils/DateHelper";
import { AddBudgetIcon } from "../../utils/Icons";
import { dollarsToCents } from "../../utils/NumberHelper";
import BudgetForm from "./BudgetForm";
import BudgetTable from "./BudgetTable";

function BudgetPage() {
    const newBudgetDefaults = {
        amount: "0.00",
        effectiveDate: formatDateOnly(moment()),
    };

    return (
        <EntityManagementPage
            entityPluralName="Budgets"
            entitySingularName="Budget"
            getEntities={BudgetService.getGrouped.bind(BudgetService)}
            newEntityDefaults={newBudgetDefaults as BudgetViewModel}
            newEntityIcon={AddBudgetIcon}
            addEntity={BudgetService.createBudget.bind(BudgetService)}
            putEntity={BudgetService.putBudget.bind(BudgetService)}
            deleteEntity={BudgetService.deleteBudget.bind(BudgetService)}
            renderTable={renderTable}
            renderForm={(form) => <BudgetForm form={form} />}
            transformBeforeSubmit={transformBeforeSubmit}
        />
    );

    function renderTable(
        groupedBugets: Grouping<Category, Budget>[] | undefined,
        edit: (c: BudgetViewModel) => void
    ): React.ReactNode {
        return groupedBugets ? (
            <BudgetTable
                groupedBudgets={groupedBugets}
                editBudget={(b) =>
                    edit({
                        ...b,
                        amount: (b.amount / 100).toFixed(2),
                    })
                }
            />
        ) : (
            <StatusIndicator status="loading" />
        );
    }

    function transformBeforeSubmit(values: BudgetViewModel) {
        return {
            ...values,
            amount: dollarsToCents(values.amount),
        };
    }
}

export default BudgetPage;

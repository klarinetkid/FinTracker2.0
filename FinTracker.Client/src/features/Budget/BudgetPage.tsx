import moment from "moment";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import Drawer from "../../components/Drawer";
import IconButton from "../../components/IconButton";
import Page from "../../components/Page";
import Row from "../../components/Row";
import StatusIndicator from "../../components/StatusIndicator";
import useRefresh from "../../hooks/useRefresh";
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
    const [groupedBudgets, setGroupedBudgets] =
        useState<Grouping<Category, Budget>[]>();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { refreshed, refresh } = useRefresh();
    const [editingValues, setEditingValues] = useState<BudgetViewModel>();

    useEffect(() => {
        BudgetService.getGrouped().then(setGroupedBudgets);
    }, [refreshed]);

    return (
        <Page>
            <Row justifyContent="space-between">
                <h1>Budget</h1>
                <IconButton
                    title="New budget item"
                    icon={AddBudgetIcon}
                    onClick={newBudget}
                />
            </Row>

            {groupedBudgets ? (
                <BudgetTable
                    groupedBudgets={groupedBudgets}
                    editBudget={editBudget}
                />
            ) : (
                <StatusIndicator status="loading" />
            )}

            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                <BudgetForm
                    onCancel={() => setIsDrawerOpen(false)}
                    onDelete={deleteFormat}
                    onSubmit={submitBudget}
                    values={editingValues}
                />
            </Drawer>
        </Page>
    );

    function newBudget() {
        setEditingValues({
            amount: "0.00",
            effectiveDate: formatDateOnly(moment()),
        });
        setIsDrawerOpen(true);
    }
    function editBudget(budget: Budget) {
        setEditingValues({
            ...budget,
            amount: (budget.amount / 100).toFixed(2),
        });
        setIsDrawerOpen(true);
    }
    function submitBudget(values: FieldValues) {

        const model: BudgetViewModel = {
            ...values,
            amount: dollarsToCents(values.amount),
        };

        (model.id
            ? BudgetService.putBudget(model)
            : BudgetService.createBudget(model)
        ).then(() => {
            refresh();
            setIsDrawerOpen(false);
        });
    }
    async function deleteFormat() {
        if (!editingValues?.id) return;
        await BudgetService.deleteBudget(editingValues.id);
        refresh();
        setIsDrawerOpen(false);
    }
}

export default BudgetPage;

import { AxiosError } from "axios";
import moment from "moment";
import { SyntheticEvent, useEffect, useState } from "react";
import Drawer from "../../components/Drawer";
import IconButton from "../../components/IconButton";
import Page from "../../components/Page";
import Row from "../../components/Row";
import { useFormValues } from "../../hooks/useFormValues";
import { ErrorResponse } from "../../services/BaseService";
import BudgetService from "../../services/BudgetService";
import Budget from "../../types/Budget";
import BudgetViewModel from "../../types/BudgetViewModel";
import Category from "../../types/Category";
import Grouping from "../../types/Grouping";
import { formatDateOnly } from "../../utils/DateHelper";
import { AddRoundLightFillIcon } from "../../utils/Icons";
import BudgetForm from "./BudgetForm";
import BudgetTable from "./BudgetTable";
import useRefresh from "../../hooks/useRefresh";
import StatusIndicator from "../../components/StatusIndicator";

function BudgetPage() {
    const [groupedBudgets, setGroupedBudgets] =
        useState<Grouping<Category, Budget>[]>();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { refreshed, refresh } = useRefresh();

    const formValues = useFormValues<BudgetViewModel>({});

    useEffect(() => {
        BudgetService.getGrouped().then(setGroupedBudgets);
    }, [refreshed]);

    return (
        <Page>
            <Row justifyContent="space-between">
                <h1>Budget</h1>
                <IconButton
                    title="New budget item"
                    icon={AddRoundLightFillIcon}
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
                    formValues={formValues}
                    onCancel={() => setIsDrawerOpen(false)}
                    onDelete={deleteFormat}
                    onSubmit={submitBudget}
                />
            </Drawer>
        </Page>
    );

    function newBudget() {
        formValues.setErrors(undefined);
        formValues.setValues({
            amount: "0.00",
            effectiveDate: formatDateOnly(moment()),
        });
        setIsDrawerOpen(true);
    }
    function editBudget(budget: Budget) {
        formValues.setErrors(undefined);
        const model = {
            ...budget,
            category: undefined,
            amount: (budget.amount / 100).toFixed(2),
        };
        formValues.setValues(model);
        setIsDrawerOpen(true);
    }
    function submitBudget(event: SyntheticEvent) {
        event.preventDefault();

        // cast values
        const model: BudgetViewModel = {
            ...formValues.values,
            amount:
                Math.floor(
                    Number(formValues.values?.amount?.toString() ?? NaN) * 100
                ) ?? undefined,
        };

        (formValues.values.id
            ? BudgetService.putBudget(model)
            : BudgetService.createBudget(model)
        )
            .then(() => {
                if (event.target instanceof HTMLButtonElement)
                    event.target.blur();
                refresh();
                setIsDrawerOpen(false);
                formValues.setErrors(undefined);
            })
            .catch((error: AxiosError<ErrorResponse>) => {
                formValues.setErrors(error.response?.data);
            });
    }
    async function deleteFormat() {
        if (!formValues.values.id) return;
        await BudgetService.deleteBudget(formValues.values.id);
        refresh();
        setIsDrawerOpen(false);
    }
}

export default BudgetPage;

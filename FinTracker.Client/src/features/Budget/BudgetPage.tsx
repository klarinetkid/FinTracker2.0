import { useEffect, useState } from "react";
import AddIcon from "../../assets/Add_round_fill_light.svg?react";
import Drawer from "../../components/Drawer";
import useFormValues from "../../hooks/useFormValues";
import ImportFileFormat from "../../types/ImportFileFormat";
import BudgetItemForm, { BudgetItemFormValues } from "./BudgetItemForm";
import BudgetTable from "./BudgetTable";
import BudgetItem, { BudgetItemGroup } from "../../types/BudgetItem";
import BudgetItemService from "../../services/BudgetItemService";
import moment from "moment";

function BudgetPage() {
    const [groupedBudgets, setGroupedBudgets] = useState<BudgetItemGroup[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isRefreshed, setIsRefreshed] = useState(false);

    const [formValues, setFormValues, updateFormValues] =
        useFormValues<BudgetItemFormValues>({
            id: 0,
            categoryId: undefined,
            amount: "0",
            effectiveDate: "",
        });

    useEffect(() => {
        BudgetItemService.getGrouped().then(setGroupedBudgets);
    }, [isRefreshed]);

    return (
        <div className="page" style={{ width: 800 }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div></div>
                <h1>Budget</h1>
                <div>
                    <AddIcon width={36} height={36} onClick={newBudgetItem} />
                </div>
            </div>

            <BudgetTable
                groupedBudgets={groupedBudgets}
                editBudgetItem={editBudgetItem}
            />

            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                <BudgetItemForm
                    formValues={formValues}
                    updateFormValues={updateFormValues}
                    setFormValues={setFormValues}
                    onCancel={() => setIsDrawerOpen(false)}
                    onDelete={deleteFormat}
                    onSubmit={submitBudgetItem}
                />
            </Drawer>
        </div>
    );

    function newBudgetItem() {
        setFormValues({
            id: 0,
            categoryId: 0,
            amount: "0.00",
            effectiveDate: "",
        });
        setIsDrawerOpen(true);
    }
    function editBudgetItem(budgetItem: BudgetItem) {
        setFormValues({
            ...budgetItem,
            amount: (budgetItem.amount / 100).toFixed(2),
            effectiveDate: moment(budgetItem.effectiveDate).format(
                "yyyy-MM-DD"
            ),
        });
        setIsDrawerOpen(true);
    }
    async function submitBudgetItem(event) {
        event.preventDefault();

        const payload = {
            ...formValues,
            amount: Math.round(parseFloat(formValues.amount) * 100),
        };

        if (formValues.id === 0) {
            await BudgetItemService.createBudgetItem(payload);
        } else {
            await BudgetItemService.putBudgetItem(payload);
        }

        setIsRefreshed(!isRefreshed);
        setIsDrawerOpen(false);
    }
    async function deleteFormat() {
        await BudgetItemService.deleteBudgetItem(formValues);
        setIsRefreshed(!isRefreshed);
        setIsDrawerOpen(false);
    }
}

export default BudgetPage;

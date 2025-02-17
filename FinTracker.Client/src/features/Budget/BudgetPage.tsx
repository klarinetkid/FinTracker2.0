import moment from "moment";
import { SyntheticEvent, useEffect, useState } from "react";
import AddIcon from "../../assets/Add_round_fill_light.svg?react";
import Drawer from "../../components/Drawer";
import useFormValues from "../../hooks/useFormValues";
import BudgetItemService from "../../services/BudgetItemService";
import BudgetItem, { BudgetItemGroup } from "../../types/BudgetItem";
import BudgetItemForm from "./BudgetItemForm";
import BudgetTable from "./BudgetTable";
import IconButton from "../../components/IconButton";
import BudgetItemFormValues, {
    BudgetFormValuesToModel,
    BudgetItemFormDefaults,
    BudgetItemToFormValues,
} from "../../types/forms/BudgetItemFormValues";

function BudgetPage() {
    const [groupedBudgets, setGroupedBudgets] = useState<BudgetItemGroup[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isRefreshed, setIsRefreshed] = useState(false);

    const [formValues, setFormValues, updateFormValues] =
        useFormValues<BudgetItemFormValues>(BudgetItemFormDefaults);

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
                {/*<div></div>*/}
                <h1>Budget</h1>
                <IconButton icon={AddIcon} onClick={newBudgetItem} />
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
        setFormValues(BudgetItemFormDefaults);
        setIsDrawerOpen(true);
    }
    function editBudgetItem(budgetItem: BudgetItem) {
        setFormValues(BudgetItemToFormValues(budgetItem));
        setIsDrawerOpen(true);
    }
    async function submitBudgetItem(event: SyntheticEvent) {
        event.preventDefault();

        const model = BudgetFormValuesToModel(formValues);

        if (formValues.id === 0) {
            await BudgetItemService.createBudgetItem(model);
        } else {
            await BudgetItemService.putBudgetItem(model);
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

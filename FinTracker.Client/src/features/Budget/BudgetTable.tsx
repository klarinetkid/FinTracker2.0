import "../../styles/Budget.css";
import BudgetItem, { BudgetItemGroup } from "../../types/BudgetItem";
import BudgetTableRowGroup from "./BudgetTableRowGroup";

interface BudgetTableProps {
    groupedBudgets: BudgetItemGroup[];
    editBudgetItem: (format: BudgetItem) => void;
}

// TODO make expand button float so doesn't trigger click row

function BudgetTable(props: BudgetTableProps) {
    return (
        <div className="table-holder">
            <table className="table budget-table selectable">
                <thead>
                    <tr>
                        <th></th>
                        <th>Category</th>
                        <th>Monthly Amount</th>
                        <th>Effective Date</th>
                        <th></th>
                    </tr>
                </thead>
                {props.groupedBudgets.map((b, i) => (
                    <BudgetTableRowGroup
                        key={i}
                        budgetGroup={b}
                        num={i}
                        editBudgetItem={props.editBudgetItem}
                    />
                ))}
            </table>
        </div>
    );
}

export default BudgetTable;

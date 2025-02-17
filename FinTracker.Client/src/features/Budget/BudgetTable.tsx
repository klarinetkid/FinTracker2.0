import "../../styles/Budget.css";
import { BudgetItemGroup } from "../../types/BudgetItem";
import ImportFileFormat from "../../types/ImportFileFormat";
import BudgetTableRowGroup from "./BudgetTableRowGroup";

interface BudgetTableProps {
    groupedBudgets: BudgetItemGroup[];
    editBudgetItem: (format: ImportFileFormat) => void;
}

// TODO make expand button float so doesn't trigger click row

function BudgetTable(props: BudgetTableProps) {
    return (
        <div className="table-holder">
            <table className="table budget-table">
                <thead>
                    <tr>
                        <th style={{width:20}}></th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Effective Date</th>
                        <td></td>
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

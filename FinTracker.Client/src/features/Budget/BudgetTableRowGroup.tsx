import { useState } from "react";
import BudgetItem, { BudgetItemGroup } from "../../types/BudgetItem";
import BudgetTableRow from "./BudgetTableRow";

interface BudgetTableRowGroupProps {
    budgetGroup: BudgetItemGroup;
    num: number;
    editBudgetItem: (format: BudgetItem) => void;
}

function BudgetTableRowGroup(props: BudgetTableRowGroupProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <tbody className={`budget-item-group ${isExpanded ? "expanded" : ""}`}>
            {props.budgetGroup.budgetItems.map((b, i) => (
                <BudgetTableRow
                    key={i}
                    num={
                        i === 0
                            ? (props.num + 1).toString()
                            : `${props.num + 1}.${i + 1}`
                    }
                    budgetItem={b}
                    isCurrent={i === 0}
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                    groupCount={props.budgetGroup.budgetItems.length}
                    editBudgetItem={props.editBudgetItem}
                />
            ))}
        </tbody>
    );
}

export default BudgetTableRowGroup;

import moment from "moment";
import BudgetItem from "../../types/BudgetItem";
import { formatCurrency } from "../../utils/NumberHelper";
import CategoryPill from "../../components/CategoryPill";

interface BudgetTableRowProps {
    budgetItem: BudgetItem;
    num: string;
    isCurrent: boolean;
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    groupCount: number;
    editBudgetItem: (format: BudgetItem) => void;
}

function BudgetTableRow(props: BudgetTableRowProps) {
    return (
        <tr className={props.isCurrent ? "current" : "past"}>
            <td className="bold">{props.num}</td>
            <td
                className="centre selectable"
                onClick={() => props.editBudgetItem(props.budgetItem)}
            >
                <CategoryPill category={props.budgetItem.category} />
            </td>
            <td className="ralign">
                {formatCurrency(props.budgetItem.amount)}
            </td>
            <td className="ralign">
                {moment(props.budgetItem.effectiveDate).format("yyyy-MM-DD")}
            </td>
            <td
                onClick={() =>
                    props.isCurrent && props.setIsExpanded(!props.isExpanded)
                }
            >
                <div style={{ position: "absolute", userSelect: "none" }}>
                    {props.isCurrent && props.groupCount > 1
                        ? props.isExpanded
                            ? "^"
                            : "v"
                        : ""}
                </div>
            </td>
        </tr>
    );
}

export default BudgetTableRow;

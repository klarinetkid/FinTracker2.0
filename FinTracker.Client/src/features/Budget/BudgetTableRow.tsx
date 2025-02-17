import moment from "moment";
import BudgetItem from "../../types/BudgetItem";
import { formatCurrency } from "../../utils/NumberHelper";
import CategoryPill from "../../components/CategoryPill";
import ExpandUpIcon from "../../assets/Expand_up.svg?react";
import ExpandDownIcon from "../../assets/Expand_down.svg?react";
import IconButton from "../../components/IconButton";

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
        <tr
            className={props.isCurrent ? "current" : "past"}
            onClick={() => props.editBudgetItem(props.budgetItem)}
        >
            <td className="bold centre noselect">{props.num}</td>
            <td className="centre selectable">
                <CategoryPill category={props.budgetItem.category} />
            </td>
            <td>
                <input
                    className="ralign"
                    readOnly
                    value={formatCurrency(props.budgetItem.amount)}
                />
            </td>
            <td>
                <input
                    className="ralign"
                    readOnly
                    value={moment(props.budgetItem.effectiveDate).format(
                        "yyyy-MM-DD"
                    )}
                />
            </td>
            <td style={{ width: 0 }}>
                {props.isCurrent && props.groupCount > 1 ? (
                    <IconButton
                        icon={props.isExpanded ? ExpandUpIcon : ExpandDownIcon}
                        onClick={toggleExpand}
                    />
                ) : (
                    ""
                )}
            </td>
        </tr>
    );

    function toggleExpand(event: React.MouseEvent<HTMLDivElement>) {
        if (props.isCurrent) {
            event.stopPropagation();
            props.setIsExpanded(!props.isExpanded);
        }
    }
}

export default BudgetTableRow;

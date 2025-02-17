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
        <tr className={props.isCurrent ? "current" : "past"}>
            <td className="bold centre noselect">{props.num}</td>
            <td
                className="centre selectable"
                onClick={() => props.editBudgetItem(props.budgetItem)}
            >
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
            <td
                onClick={() =>
                    props.isCurrent && props.setIsExpanded(!props.isExpanded)
                }
                style={{ width: 0 }}
            >
                {props.isCurrent && props.groupCount > 1 ? (
                    props.isExpanded ? (
                        <IconButton icon={ExpandUpIcon} />
                    ) : (
                        <IconButton icon={ExpandDownIcon} />
                    )
                ) : (
                    ""
                )}
            </td>
        </tr>
    );
}

export default BudgetTableRow;

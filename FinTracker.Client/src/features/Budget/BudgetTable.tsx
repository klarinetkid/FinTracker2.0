import moment from "moment";
import CategoryPill from "../../components/CategoryPill";
import GroupedTable from "../../components/GroupedTable";
import GroupedTableRow from "../../components/GroupedTableRow";
import GroupedTableRowSet from "../../components/GroupedTableRowSet";
import Input from "../../components/Input";
import BudgetItem, { BudgetItemGroup } from "../../types/BudgetItem";
import { formatCurrency } from "../../utils/NumberHelper";

interface BudgetTableProps {
    groupedBudgets: BudgetItemGroup[];
    editBudgetItem: (format: BudgetItem) => void;
}

function BudgetTable(props: BudgetTableProps) {
    return (
        <GroupedTable selectable={true}>
            {props.groupedBudgets.map((group, groupIndex) => (
                <GroupedTableRowSet key={groupIndex}>
                    {group.budgetItems.map((budgetItem, i) => (
                        <GroupedTableRow
                            key={i}
                            rowIndex={i}
                            onClick={() => props.editBudgetItem(budgetItem)}
                        >
                            <td className="bold centre">
                                {i === 0 ? groupIndex + 1 : ""}
                            </td>
                            <td className="centre selectable">
                                <CategoryPill category={budgetItem.category} />
                            </td>
                            <td>
                                <Input
                                    className="ralign"
                                    readOnly
                                    value={formatCurrency(budgetItem.amount)}
                                />
                            </td>
                            <td>
                                <Input
                                    className="ralign"
                                    readOnly
                                    value={moment(
                                        budgetItem.effectiveDate
                                    ).format("yyyy-MM-DD")}
                                />
                            </td>
                        </GroupedTableRow>
                    ))}
                </GroupedTableRowSet>
            ))}
        </GroupedTable>
    );
}

export default BudgetTable;

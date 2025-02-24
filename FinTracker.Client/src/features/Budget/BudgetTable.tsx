import moment from "moment";
import CategoryPill from "../../components/CategoryPill";
import GroupedTable from "../../components/GroupedTable";
import GroupedTableRow from "../../components/GroupedTableRow";
import GroupedTableRowSet from "../../components/GroupedTableRowSet";
import Input from "../../components/Input";
import Budget from "../../types/Budget";
import Category from "../../types/Category";
import Grouping from "../../types/Grouping";
import { formatCurrency } from "../../utils/NumberHelper";
import EmptyTableMessage from "../../components/EmptyTableMessage";

interface BudgetTableProps {
    groupedBudgets: Grouping<Category, Budget>[];
    editBudget: (format: Budget) => void;
}

function BudgetTable(props: BudgetTableProps) {
    return (
        <GroupedTable>
            <thead>
                <tr>
                    <th></th>
                    <th>Category</th>
                    <th>Monthly Amount</th>
                    <th>Effective Date</th>
                    <th></th>
                </tr>
            </thead>
            {props.groupedBudgets.map((group, groupIndex) => (
                <GroupedTableRowSet key={groupIndex}>
                    {group.items.map((budget, i) => (
                        <GroupedTableRow key={i} rowIndex={i}>
                            <td className="bold centre">
                                {i === 0 ? groupIndex + 1 : ""}
                            </td>
                            <td className="centre selectable">
                                <CategoryPill
                                    category={budget.category}
                                    onClick={() => props.editBudget(budget)}
                                />
                            </td>
                            <td>
                                <Input
                                    className="ralign"
                                    readOnly
                                    value={formatCurrency(budget.amount)}
                                />
                            </td>
                            <td>
                                <Input
                                    className="ralign"
                                    readOnly
                                    value={moment(budget.effectiveDate).format(
                                        "yyyy-MM-DD"
                                    )}
                                />
                            </td>
                        </GroupedTableRow>
                    ))}
                </GroupedTableRowSet>
            ))}

            {props.groupedBudgets.length === 0 ? <EmptyTableMessage /> : ""}
        </GroupedTable>
    );
}

export default BudgetTable;

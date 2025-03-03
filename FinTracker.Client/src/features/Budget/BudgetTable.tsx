import CategoryPill from "../../components/CategoryPill";
import EmptyTableMessage from "../../components/EmptyTableMessage";
import GroupedTable from "../../components/GroupedTable";
import GroupedTableRow from "../../components/GroupedTableRow";
import GroupedTableRowSet from "../../components/GroupedTableRowSet";
import Input from "../../components/Input";
import Budget from "../../types/Budget";
import Category from "../../types/Category";
import Grouping from "../../types/Grouping";
import { formatDateOnly } from "../../utils/DateHelper";
import { formatCurrency } from "../../utils/NumberHelper";

interface BudgetTableProps {
    groupedBudgets: Grouping<Category, Budget>[];
    editBudget: (format: Budget) => void;
}

function BudgetTable(props: BudgetTableProps) {
    const { groupedBudgets, editBudget } = props;

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
            {groupedBudgets.map((group, groupIndex) => (
                <GroupedTableRowSet key={groupIndex}>
                    {group.items.map((budget, i) => (
                        <GroupedTableRow key={i} rowIndex={i}>
                            <td className="bold centre">
                                {i === 0 ? groupIndex + 1 : ""}
                            </td>
                            <td className="centre">
                                <CategoryPill
                                    category={budget.category}
                                    onClick={() => editBudget(budget)}
                                />
                            </td>
                            <td>
                                <Input
                                    className="ralign selectable"
                                    onClick={() => editBudget(budget)}
                                    readOnly
                                    value={formatCurrency(
                                        budget.amount,
                                        false,
                                        true
                                    )}
                                />
                            </td>
                            <td>
                                <Input
                                    className="ralign selectable"
                                    onClick={() => editBudget(budget)}
                                    readOnly
                                    value={formatDateOnly(budget.effectiveDate)}
                                />
                            </td>
                        </GroupedTableRow>
                    ))}
                </GroupedTableRowSet>
            ))}

            {groupedBudgets.length === 0 && <EmptyTableMessage />}
        </GroupedTable>
    );
}

export default BudgetTable;

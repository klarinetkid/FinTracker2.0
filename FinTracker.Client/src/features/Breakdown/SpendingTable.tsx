import Checkbox from "../../components/Checkbox";
import useCategorySelection from "../../hooks/useCategorySelection";
import styles from "../../styles/SpendingTable.module.css";
import Breakdown from "../../types/Breakdown";
import { Total, Uncategorized } from "../../types/Category";
import CategoryTotal from "../../types/CategoryTotal";
import { sum } from "../../utils/ArrayHelper";
import SpendingTableRow from "./SpendingTableRow";

interface SpendingTableProps {
    categoryTotals: CategoryTotal[];
}

function SpendingTable(props: SpendingTableProps) {
    const categorySelection = useCategorySelection();
    const { categoryTotals } = props;

    const spendingCategories = categoryTotals
        .filter((c) => c.total < 0)
        .sort((a, b) => a.total - b.total);

    const allAreSelected = categorySelection.selectedCategories.length > 0;

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>
                        <Checkbox
                            checked={allAreSelected}
                            onChange={toggleAllCategories}
                        />
                    </th>
                    <th>Category</th>
                    <th>Total</th>
                    <th>% of in.</th>
                    <th>% of sp.</th>
                    <th>Budget</th>
                    <th></th>
                </tr>
                <tr></tr>
            </thead>

            {spendingCategories.length > 0 ? (
                <>
                    {spendingCategories.map((c, i) => (
                        <SpendingTableRow
                            key={i}
                            categoryTotal={c}
                            maxCategorySpend={spendingCategories[0].total}
                        />
                    ))}

                    <SpendingTableRow
                        key={-1}
                        categoryTotal={aggregateSelectedCategoryTotals()}
                        maxCategorySpend={spendingCategories[0]?.total}
                        noSelect={true}
                        visible={selectedSpendingCategories().length !== 0}
                    />
                </>
            ) : (
                <tbody>
                    <tr>
                        <td colSpan={7} className="centre">
                            <h4>No spending? Right on!</h4>
                        </td>
                    </tr>
                </tbody>
            )}
        </table>
    );

    function toggleAllCategories() {
        if (categorySelection.selectedCategories.length > 0) {
            categorySelection.clear();
        } else {
            categorySelection.addCategories(
                spendingCategories.map((c) => c.category ?? Uncategorized)
            );
        }
    }

    function selectedSpendingCategories() {
        return categoryTotals
            .filter((c) =>
                categorySelection.isSelected(c.category ?? Uncategorized)
            )
            .filter((c) => c.total < 0);
    }

    function aggregateSelectedCategoryTotals(): CategoryTotal {
        const selectedCategoryTotals = selectedSpendingCategories();

        return {
            category: Total,
            total: sum(selectedCategoryTotals.map((c) => c.total)),
            percentOfIncome: sum(
                selectedCategoryTotals.map((c) => c.percentOfIncome)
            ),
            percentOfSpend: sum(
                selectedCategoryTotals.map((c) => c.percentOfSpend)
            ),
        };
    }
}

export default SpendingTable;

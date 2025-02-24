import Checkbox from "../../components/Checkbox";
import EmptyTableMessage from "../../components/EmptyTableMessage";
import useCategorySelection from "../../hooks/useCategorySelection";
import styles from "../../styles/SpendingTable.module.css";
import { Total, Uncategorized } from "../../types/Category";
import CategoryTotal from "../../types/CategoryTotal";
import { sum } from "../../utils/ArrayHelper";
import SpendingTableRow from "./SpendingTableRow";

interface SpendingTableProps {
    spendingCategories: CategoryTotal[];
}

function SpendingTable(props: SpendingTableProps) {
    const { spendingCategories } = props;
    const categorySelection = useCategorySelection();

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
                <EmptyTableMessage />
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
        return spendingCategories
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

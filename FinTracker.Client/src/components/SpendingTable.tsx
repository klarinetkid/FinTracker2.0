import '../styles/SpendingTable.css';
import Breakdown from "../types/Breakdown";
import { getBreakdownBudgetMonthFactor, getTotalSpend } from '../utils/BreakdownHelper';
import SpendingTableRow from './SpendingTableRow';
import CategoryTotal from '../types/CategoryTotal';
import { Total, Uncategorized } from '../types/Category';
import useCategorySelection from '../hooks/useCategorySelection';
import Checkbox from './Checkbox';

interface SpendingTableProps {
    breakdown: Breakdown,
}

function SpendingTable(props: SpendingTableProps) {

    const totalSpend = getTotalSpend(props.breakdown)

    const spendingCategories = props.breakdown.categoryTotals
        .filter(c => c.total < 0)
        .sort((a, b) => Math.abs(b.percentOfIncome) - Math.abs(a.percentOfIncome))

    const budgetFactor = getBreakdownBudgetMonthFactor(props.breakdown)

    const categorySelection = useCategorySelection()

    return (
        <div className="breakdown-table">
            <table>
                <thead>
                    <tr>
                        <th>
                            <div style={{position:"relative",top:12,userSelect:"none"}}>
                                <Checkbox
                                    key={(categorySelection.selectedCategories.length > 0).toString()}
                                    checked={categorySelection.selectedCategories.length > 0}
                                    onChange={toggleAllCategories} />
                            </div>
                        </th>
                        <th>Category</th>
                        <th>Total</th>
                        <th>% of in.</th>
                        <th>% of sp.</th>
                        <th>Budget</th>
                        <th></th>
                    </tr>
                    <tr style={{height: "20px"} }></tr>
                </thead>

                {spendingCategories.map((c, i) =>
                    <SpendingTableRow
                        key={i}
                        categoryTotal={c}
                        budget={props.breakdown.effectiveBudgetItems.filter(b => b.category.id == c.category?.id)[0]}
                        budgetFactor={budgetFactor}
                        spendingCategories={spendingCategories}
                        totalSpend={totalSpend}
                        />
                )}


                {/*TODO make a row here so transaction table doesn't jump up and down as selecting*/}
                {selectedSpendingCategories().length == 0 ? "" :
                    <SpendingTableRow
                        key={-1}
                        categoryTotal={aggregateSelectedCategoryTotals()}
                        spendingCategories={spendingCategories}
                        totalSpend={totalSpend}
                        noSelect={true}
                        />
                }
                        
            </table>
        </div>   
    )

    function toggleAllCategories() {
        if (categorySelection.selectedCategories.length > 0) {
            categorySelection.clear()
        } else {
            categorySelection.addCategories(spendingCategories.map(c => c.category ?? Uncategorized))
        }
    }

    function selectedSpendingCategories() {
        return props.breakdown.categoryTotals
            .filter(c => categorySelection.isSelected(c.category ?? Uncategorized))
            .filter(c => c.total < 0)
    }

    function aggregateSelectedCategoryTotals(): CategoryTotal {
        
        const selectedCategoryTotals = selectedSpendingCategories()

        return {
            category: Total,
            total: selectedCategoryTotals.map(c => c.total).reduce((sum, i) => sum + i),
            percentOfIncome: selectedCategoryTotals.map(c => c.percentOfIncome).reduce((sum, i) => sum + i) // TODO: does this work?
        }
    }
}

export default SpendingTable;
import BudgetItem from "./BudgetItem"
import CategoryTotal from "./CategoryTotal"
import Transaction from "./Transaction"

type Breakdown = {
    start: Date,
    end: Date,
    totalIn: number,
    totalOut: number,
    categoryTotals: CategoryTotal[],
    effectiveBudgetItems: BudgetItem[],
    transactions: Transaction[],
    title: string
}

export default Breakdown
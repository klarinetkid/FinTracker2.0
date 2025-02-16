import moment from "moment"
import { useEffect, useState } from "react"
import TransactionService from "../services/TransactionService"
import Transaction from "../types/Transaction"
import Category, { Uncategorized } from "../types/Category"
import { formatCurrency } from "../utils/NumberHelper"
import CategoryPill from "./CategoryPill"
import CategorySelector from "./CategorySelector"
import useCategorySelection from "../hooks/useCategorySelection"

interface TransactionTableRowProps {
    transaction: Transaction,
    rowId: number,
    onChange?: () => void
}

function TransactionTableRow(props: TransactionTableRowProps) {

    const [isEditingCat, setIsEditingCat] = useState(false)
    const [newCategory, setNewCategory] = useState<Category>()

    const [transaction, setTransaction] = useState(props.transaction)

    const categorySelection = useCategorySelection()

    useEffect(() => {
        patchTransaction()
    }, [newCategory])

    return (
        <tr className={categorySelection.isSelected(transaction.category ?? Uncategorized) ? "selected" : ""} title={transaction.category?.id?.toString()}>
            <td className="bold centre" title={"Row ID: " + transaction.id}>{props.rowId}</td>
            <td className="nobreak">{moment(transaction.date).format("yyyy-MM-DD")}</td>
            <td className="ellipsis-overflow lalign" style={{ maxWidth: "70%" }}>{transaction.memo}</td>
            <td className="ralign">{formatCurrency(transaction.amount)}</td>
            <td className="centre" onDoubleClick={() => setIsEditingCat(true)}>
                {isEditingCat ? (
                    <CategorySelector
                        onChange={setNewCategory}
                        value={transaction.category}
                        isOpen={true}
                        onClose={() => setIsEditingCat(false)} />
                ) : (
                    <CategoryPill category={transaction.category} />
                )}
            </td>
        </tr>
    )

    async function patchTransaction() {
        if (newCategory === undefined) return

        const payload = {
            id: transaction.id,
            categoryId: newCategory.id,
        }
        const updatedTransaction = await TransactionService.patchTransaction(payload)
        setTransaction(updatedTransaction)

        setIsEditingCat(false)
        if (props.onChange) props.onChange()
    }
}

export default TransactionTableRow;
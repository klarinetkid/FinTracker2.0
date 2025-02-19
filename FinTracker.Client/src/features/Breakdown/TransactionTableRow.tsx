import moment from "moment";
import { useEffect, useState } from "react";
import CategoryPill from "../../components/CategoryPill";
import CategorySelector from "../../components/CategorySelector";
import useCategorySelection from "../../hooks/useCategorySelection";
import TransactionService from "../../services/TransactionService";
import Category, { Uncategorized } from "../../types/Category";
import Transaction from "../../types/Transaction";
import { formatCurrency } from "../../utils/NumberHelper";
import style from "../../styles/TransactionTableRow.module.css";
import { classList } from "../../utils/htmlHelper";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";

interface TransactionTableRowProps {
    transaction: Transaction;
    num: number;
    onChange?: () => void;
}

function TransactionTableRow(props: TransactionTableRowProps) {
    const [isEditingCat, setIsEditingCat] = useState(false);
    const [newCategory, setNewCategory] = useState<Category>();
    const [transaction, setTransaction] = useState(props.transaction);
    const categorySelection = useCategorySelection();
    const globalDataCache = useGlobalDataCache();

    useEffect(() => {
        patchTransaction();
    }, [newCategory]);

    return (
        <tr
            className={classList(
                style.transactionRow,
                categorySelection.isSelected(
                    transaction.category ?? Uncategorized
                )
                    ? "selected"
                    : ""
            )}
            title={transaction.category?.id?.toString()}
        >
            <td className="bold centre">{props.num + 1}</td>
            <td className="nobreak">
                {moment(transaction.date).format("yyyy-MM-DD")}
            </td>
            <td
                className="ellipsis-overflow lalign"
                style={{ maxWidth: "70%" }}
            >
                {transaction.memo}
            </td>
            <td className="ralign">{formatCurrency(transaction.amount)}</td>
            <td
                className="centre noselect"
                onDoubleClick={() => setIsEditingCat(true)}
            >
                {isEditingCat ? (
                    <CategorySelector
                        categories={globalDataCache.categories.value}
                        onChange={setNewCategory}
                        value={transaction.category}
                        isOpen={true}
                        onClose={() => setIsEditingCat(false)}
                    />
                ) : (
                    <CategoryPill category={transaction.category} />
                )}
            </td>
        </tr>
    );

    async function patchTransaction() {
        if (newCategory === undefined) return;

        const payload = {
            id: transaction.id,
            categoryId: newCategory.id,
        };
        const updatedTransaction =
            await TransactionService.patchTransaction(payload);
        setTransaction(updatedTransaction);

        setIsEditingCat(false);
        if (props.onChange) props.onChange();
    }
}

export default TransactionTableRow;

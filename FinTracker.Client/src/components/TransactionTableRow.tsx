import moment from "moment";
import { useEffect, useState } from "react";
import CategoryPill from "../components/CategoryPill";
import CategorySelector from "../components/CategorySelector";
import useCategorySelection from "../hooks/useCategorySelection";
import useGlobalDataCache from "../hooks/useGlobalDataCache";
import TransactionService from "../services/TransactionService";
import styles from "../styles/TransactionTable.module.css";
import Category, { Uncategorized } from "../types/Category";
import TransactionViewModel from "../types/TransactionViewModel";
import { MoneyFillIcon } from "../utils/Icons";
import { formatCurrency } from "../utils/NumberHelper";

interface TransactionTableRowProps {
    transaction: TransactionViewModel;
    num: number;
    onChange?: () => void;
    onRowSelect?: (transaction: TransactionViewModel) => void;
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

    const isSelected = categorySelection.isSelected(
        transaction.category ?? Uncategorized
    );

    return (
        <tr className={isSelected ? styles.selected : undefined}>
            <td className="bold centre">{props.num + 1}</td>
            <td className="nobreak">
                {moment(transaction.date).isValid()
                    ? moment(transaction.date).format("yyyy-MM-DD")
                    : ""}
            </td>
            <td
                className="ellipsis-overflow lalign"
                style={{ maxWidth: "70%", position: "relative" }}
                onClick={() =>
                    props.onRowSelect && props.onRowSelect(transaction)
                }
            >
                {transaction.memo}

                {transaction.isCashTransaction ? (
                    <MoneyFillIcon className={styles.cashTransactionIcon} />
                ) : (
                    ""
                )}
            </td>
            <td className="ralign">
                {transaction.amount ? formatCurrency(transaction.amount) : ""}
            </td>
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

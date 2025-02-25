import { useEffect, useState } from "react";
import CategoryPill from "../components/CategoryPill";
import CategorySelector from "../components/CategorySelector";
import useCategorySelection from "../hooks/useCategorySelection";
import useGlobalDataCache from "../hooks/useGlobalDataCache";
import TransactionService from "../services/TransactionService";
import styles from "../styles/TransactionTable.module.css";
import { CategoryOrUncategorized, Uncategorized } from "../types/Category";
import TransactionViewModel from "../types/TransactionViewModel";
import { formatDateOnly } from "../utils/DateHelper";
import { MoneyFillIcon } from "../utils/Icons";
import { formatCurrency } from "../utils/NumberHelper";
import { classList } from "../utils/HtmlHelper";

interface TransactionTableRowProps {
    transaction: TransactionViewModel;
    num: number;
    onChange?: () => void;
    onRowSelect?: (transaction: TransactionViewModel) => void;
}

// TODO: does this really need a state? I guess it prevents the category
// flashing back momentarily before table is refreshed when updated
function TransactionTableRow(props: TransactionTableRowProps) {
    const { transaction, num, onChange, onRowSelect } = props;

    const [isEditingCat, setIsEditingCat] = useState(false);
    const [newCategory, setNewCategory] = useState<CategoryOrUncategorized>();
    const [transactionLocal, setTransactionLocal] = useState(transaction);
    const categorySelection = useCategorySelection();
    const globalDataCache = useGlobalDataCache();

    useEffect(() => {
        patchTransaction();
    }, [newCategory]);

    const isSelected = categorySelection.isSelected(
        transactionLocal.category ?? Uncategorized
    );

    return (
        <tr className={isSelected ? styles.selected : undefined}>
            <td className="bold centre">{num + 1}</td>
            <td className="nobreak">{formatDateOnly(transactionLocal.date)}</td>
            <td
                className={classList(
                    styles.ellipsis,
                    onChange ? styles.selectable : ""
                )}
                style={{ maxWidth: "70%", position: "relative" }}
                onClick={_onClick}
            >
                <span
                    className={classList(
                        styles.ellipsisContent,
                        transactionLocal.isCashTransaction ? styles.cash : ""
                    )}
                >
                    {transactionLocal.memo}
                </span>

                {transactionLocal.isCashTransaction ? (
                    <MoneyFillIcon className={styles.cashTransactionIcon} />
                ) : (
                    ""
                )}
            </td>
            <td className="ralign">
                {formatCurrency(transactionLocal.amount)}
            </td>
            <td className="centre noselect" onDoubleClick={_categoryDblClick}>
                {isEditingCat ? (
                    <CategorySelector
                        categories={globalDataCache.categories.value}
                        onChange={setNewCategory}
                        value={transactionLocal.category}
                        isOpen={true}
                        onClose={() => setIsEditingCat(false)}
                    />
                ) : (
                    <CategoryPill category={transactionLocal.category} />
                )}
            </td>
        </tr>
    );

    function _onClick() {
        if (onRowSelect) onRowSelect(transactionLocal);
    }

    function _categoryDblClick() {
        setIsEditingCat(true);
    }

    async function patchTransaction() {
        if (newCategory === undefined) return;

        const payload = {
            id: transactionLocal.id,
            categoryId: newCategory.id,
        };
        const updatedTransaction =
            await TransactionService.patchTransaction(payload);
        setTransactionLocal(updatedTransaction);

        setIsEditingCat(false);
        if (onChange) onChange();
    }
}

export default TransactionTableRow;

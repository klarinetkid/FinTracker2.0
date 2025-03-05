import { useState } from "react";
import CategoryPill from "../components/CategoryPill";
import CategorySelector from "../components/CategorySelector";
import useCategorySelection from "../hooks/useCategorySelection";
import useGlobalDataCache from "../hooks/useGlobalDataCache";
import TransactionService from "../services/TransactionService";
import styles from "../styles/TransactionTable.module.css";
import { CategoryOrUncategorized, Uncategorized } from "../types/Category";
import Transaction from "../types/Transaction";
import { formatDateOnly } from "../utils/DateHelper";
import { classList } from "../utils/HtmlHelper";
import { MoneyFillIcon } from "../utils/Icons";
import { formatCurrency } from "../utils/NumberHelper";

interface TransactionTableRowProps {
    transaction: Transaction;
    num: number;
    onChange?: () => void;
    onRowSelect?: (transaction: Transaction) => void;
}

function TransactionTableRow(props: TransactionTableRowProps) {
    const { transaction: trx, num, onChange, onRowSelect } = props;

    const [isEditingCat, setIsEditingCat] = useState(false);
    const categorySelection = useCategorySelection();
    const globalDataCache = useGlobalDataCache();

    const isSelected = categorySelection.isSelected(
        trx.category ?? Uncategorized
    );

    return (
        <tr className={isSelected ? styles.selected : undefined}>
            <td className="bold centre">{num + 1}</td>
            <td className="nobreak">{formatDateOnly(trx.date)}</td>
            <td
                onClick={_onClick}
                className={classList(
                    styles.ellipsis,
                    onRowSelect ? "selectable" : ""
                )}
            >
                <span
                    title={trx.memo}
                    className={classList(
                        styles.ellipsisContent,
                        trx.isCashTransaction ? styles.cash : ""
                    )}
                >
                    {trx.memo}
                </span>

                {trx.isCashTransaction && (
                    <MoneyFillIcon className={styles.cashTransactionIcon} />
                )}
            </td>
            <td className="ralign">{formatCurrency(trx.amount)}</td>
            <td className="centre noselect" onDoubleClick={_categoryDblClick}>
                {isEditingCat ? (
                    <CategorySelector
                        categories={globalDataCache.categories.value}
                        onChange={(c) => patchTransaction(c)}
                        value={trx.category}
                        isOpen={true}
                        onClose={() => setIsEditingCat(false)}
                    />
                ) : (
                    <CategoryPill category={trx.category} />
                )}
            </td>
        </tr>
    );

    function _onClick() {
        if (onRowSelect) onRowSelect(trx);
    }

    function _categoryDblClick() {
        setIsEditingCat(true);
    }

    async function patchTransaction(category?: CategoryOrUncategorized) {
        if (!category) return;

        const payload = {
            id: trx.id,
            categoryId: category.id,
        };
        await TransactionService.patchTransaction(payload);

        setIsEditingCat(false);
        if (onChange) onChange();
    }
}

export default TransactionTableRow;

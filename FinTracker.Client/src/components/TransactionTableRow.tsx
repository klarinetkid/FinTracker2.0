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
    const { transaction: trx, num, onChange, onRowSelect } = props;

    const [isEditingCat, setIsEditingCat] = useState(false);
    const [newCategory, setNewCategory] = useState<CategoryOrUncategorized>();
    const categorySelection = useCategorySelection();
    const globalDataCache = useGlobalDataCache();

    useEffect(() => {
        patchTransaction();
    }, [newCategory]);

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
                    onChange ? "selectable" : ""
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

                {trx.isCashTransaction ? (
                    <MoneyFillIcon className={styles.cashTransactionIcon} />
                ) : (
                    ""
                )}
            </td>
            <td className="ralign">{formatCurrency(trx.amount)}</td>
            <td className="centre noselect" onDoubleClick={_categoryDblClick}>
                {isEditingCat ? (
                    <CategorySelector
                        categories={globalDataCache.categories.value}
                        onChange={setNewCategory}
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

    async function patchTransaction() {
        if (newCategory === undefined) return;

        const payload = {
            id: trx.id,
            categoryId: newCategory.id,
        };
        await TransactionService.patchTransaction(payload);

        setIsEditingCat(false);
        if (onChange) onChange();
    }
}

export default TransactionTableRow;

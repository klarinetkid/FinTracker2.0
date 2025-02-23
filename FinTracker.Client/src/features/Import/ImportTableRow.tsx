import moment from "moment";
import CategoryPill from "../../components/CategoryPill";
import CategorySelector from "../../components/CategorySelector";
import Checkbox from "../../components/Checkbox";
import IconButton from "../../components/IconButton";
import Input from "../../components/Input";
import Row from "../../components/Row";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import useTransactionImport from "../../hooks/useTransactionImport";
import styles from "../../styles/ImportTableRow.module.css";
import Category, { NeverImport } from "../../types/Category";
import TransactionViewModel from "../../types/TransactionViewModel";
import { classList } from "../../utils/htmlHelper";
import { formatCurrency } from "../../utils/NumberHelper";
import { SaveFillIcon, SaveIcon } from "../../utils/Icons";

interface ImportTableRowProps {
    transaction: TransactionViewModel;
    num: number;
}

function ImportTableRow(props: ImportTableRowProps) {
    const transactionImport = useTransactionImport();
    const globalDataCache = useGlobalDataCache();

    const trx = props.transaction;

    const saveBtnTitle = trx.isSelectedForImport
        ? "Save memo category"
        : "Save memo to not be imported";

    const isAutofilled =
        trx.savedMemo && trx.categoryId === trx.savedMemo.categoryId;

    return (
        <tr className={!trx.isSelectedForImport ? styles.unselected : ""}>
            <td className="bold centre">{props.num + 1}</td>
            <td>
                <Input
                    className="ralign"
                    readOnly
                    value={moment(trx.date).format("yyyy-MM-DD")}
                />
            </td>
            <td style={{ position: "relative" }}>
                <Input readOnly value={trx.memo} />
                {trx.isAlreadyImported ? (
                    <div
                        className={styles.alreadyImportedIndicator}
                        title="A transaction already exists with the same date, memo, and amount."
                    ></div>
                ) : (
                    ""
                )}
            </td>
            <td>
                <Input
                    className="ralign"
                    readOnly
                    value={formatCurrency(trx.amount ?? 0)}
                />
            </td>
            <td className="centre">
                {!trx.isSelectedForImport &&
                (trx.isToSaveMemo ||
                    (trx.savedMemo && !trx.savedMemo.isImported)) ? (
                    <CategoryPill category={NeverImport} />
                ) : (
                    <CategorySelector
                        tabIndex={1}
                        categories={globalDataCache.categories.value}
                        value={trx.category}
                        onChange={updateCategory}
                        disabled={!trx.isSelectedForImport}
                        className={classList(
                            `${isAutofilled ? styles.autofilled : ""}`,
                            `${trx.isToSaveMemo ? styles.saveMemo : ""}`
                        )}
                        onKeyDown={categorySelectKeyDown}
                    />
                )}
            </td>
            <td>
                <Row gap={6}>
                    <IconButton
                        title={saveBtnTitle}
                        icon={trx.isToSaveMemo ? SaveFillIcon : SaveIcon}
                        onClick={toggleSaveMemo}
                    />
                    <Checkbox
                        checked={trx.isSelectedForImport ?? false}
                        onChange={toggleSelected}
                    />
                </Row>
            </td>
        </tr>
    );

    function categorySelectKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Insert") toggleSaveMemo();
        if (event.key === "Delete") toggleSelected();
    }

    function updateCategory(category: Category | undefined) {
        if (!trx.id || !category) return;
        transactionImport.UpdateTransactionCategory(trx.id, category);
    }

    function toggleSaveMemo() {
        transactionImport.ToggleMemoSave(trx);
    }

    function toggleSelected() {
        transactionImport.ToggleSelected(trx);
    }
}

export default ImportTableRow;

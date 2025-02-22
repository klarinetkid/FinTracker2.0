import moment from "moment";
import { useState } from "react";
import SaveIcon from "../../assets/Save.svg?react";
import SaveFillIcon from "../../assets/Save_fill.svg?react";
import CategorySelector from "../../components/CategorySelector";
import Checkbox from "../../components/Checkbox";
import IconButton from "../../components/IconButton";
import useTransactionImport from "../../hooks/useTransactionImport";
import styles from "../../styles/ImportTableRow.module.css";
import Category from "../../types/Category";
import TransactionViewModel from "../../types/TransactionViewModel";
import { classList } from "../../utils/htmlHelper";
import { formatCurrency } from "../../utils/NumberHelper";
import Row from "../../components/Row";
import Input from "../../components/Input";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";

interface ImportTableRowProps {
    transaction: TransactionViewModel;
    num: number;
}

function ImportTableRow(props: ImportTableRowProps) {
    const [isAutofilled, setIsAutofilled] = useState(
        props.transaction.isMemoCategorized ?? false
    );
    const transactionImport = useTransactionImport();
    const globalDataCache = useGlobalDataCache();

    return (
        <tr
            className={
                !props.transaction.isSelectedForImport ? styles.unselected : ""
            }
        >
            <td className="bold centre">{props.num + 1}</td>
            <td>
                <Input
                    className="ralign"
                    readOnly
                    value={moment(props.transaction.date).format("yyyy-MM-DD")}
                />
            </td>
            <td style={{ position: "relative" }}>
                <Input readOnly value={props.transaction.memo} />
                {props.transaction.isAlreadyImported ? (
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
                    value={formatCurrency(props.transaction.amount ?? 0)}
                />
            </td>
            <td>
                <CategorySelector
                    tabIndex={1}
                    categories={globalDataCache.categories.value}
                    value={props.transaction.category}
                    onChange={updateCategory}
                    disabled={!props.transaction.isSelectedForImport}
                    className={classList(
                        `${isAutofilled ? styles.autofilled : ""}`,
                        `${props.transaction.isToSaveMemo ? styles.saveDefault : ""}`
                    )}
                    onKeyDown={categorySelectorKeyDown}
                />
            </td>
            <td>
                <Row gap={6}>
                    <IconButton
                        title="Save as default categorization"
                        icon={
                            props.transaction.isToSaveMemo
                                ? SaveFillIcon
                                : SaveIcon
                        }
                        onClick={toggleSaveDefault}
                    />
                    <Checkbox
                        checked={props.transaction.isSelectedForImport ?? false}
                        onChange={toggleSelected}
                    />
                </Row>
            </td>
        </tr>
    );

    function categorySelectorKeyDown(
        event: React.KeyboardEvent<HTMLDivElement>
    ) {
        if (event.key === "Insert") toggleSaveDefault();
        if (event.key === "Delete") toggleSelected();
    }

    function updateCategory(category: Category | undefined) {
        if (!props.transaction.id || !category) return;
        transactionImport.SetCategory(props.transaction.id, category);
        setIsAutofilled(false);
    }

    function toggleSaveDefault() {
        if (
            !props.transaction.memo ||
            !props.transaction.category ||
            !props.transaction.isSelectedForImport
        )
            return;

        if (props.transaction.isToSaveMemo) {
            transactionImport.RemoveDefault(props.transaction.memo);
        } else {
            transactionImport.AddDefault(
                props.transaction.memo,
                props.transaction.category
            );
        }
    }

    function toggleSelected() {
        if (!props.transaction.id) return;
        transactionImport.SetSelected(
            props.transaction.id,
            !props.transaction.isSelectedForImport
        );
    }
}

export default ImportTableRow;

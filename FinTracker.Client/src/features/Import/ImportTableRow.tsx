import moment from "moment";
import TransactionViewModel from "../../types/models/TransactionViewModel";
import { formatCurrency } from "../../utils/NumberHelper";
import CategorySelector from "../../components/CategorySelector";
import { useState } from "react";
import Category from "../../types/Category";
import useTransactionImport from "../../hooks/useTransactionImport";
import IconButton from "../../components/IconButton";
import SaveIcon from "../../assets/Save.svg?react";
import SaveFillIcon from "../../assets/Save_fill.svg?react";
import Checkbox from "../../components/Checkbox";

interface ImportTableRowProps {
    transaction: TransactionViewModel;
    num: number;
}

function ImportTableRow(props: ImportTableRowProps) {
    const [isAutofilled, setIsAutofilled] = useState(
        props.transaction.isDefaultCategorized ?? false
    );
    const transactionImport = useTransactionImport();

    return (
        <tr
            className={[
                `${props.transaction.isAlreadyImported ? "already-imported" : ""}`,
                `${isAutofilled ? "autofilled" : ""}`,
                `${props.transaction.saveDefault ? "save-default" : ""}`,
                `${!props.transaction.selectedForImport ? "unselected" : ""}`,
            ]
                .filter((s) => s)
                .join(" ")}
        >
            <td className="bold centre">{props.num + 1}</td>
            <td>
                <input
                    className="ralign"
                    readOnly
                    value={moment(props.transaction.date).format("yyyy-MM-DD")}
                />
            </td>
            <td style={{ position: "relative" }}>
                <input readOnly value={props.transaction.memo} />
                {props.transaction.isAlreadyImported ? (
                    <div
                        className="already-imported-indicator"
                        title="A transaction already exists with the same date, memo, and amount."
                    ></div>
                ) : (
                    ""
                )}
            </td>
            <td>
                <input
                    className="ralign"
                    readOnly
                    value={formatCurrency(props.transaction.amount ?? 0)}
                />
            </td>
            <td>
                <CategorySelector
                    value={props.transaction.category}
                    onChange={updateCategory}
                    disabled={!props.transaction.selectedForImport}
                />
            </td>
            <td>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                        icon={
                            props.transaction.saveDefault
                                ? SaveFillIcon
                                : SaveIcon
                        }
                        onClick={toggleSaveDefault}
                    />
                    <div style={{ width: 6 }}></div>
                    <Checkbox
                        checked={props.transaction.selectedForImport ?? false}
                        onChange={toggleSelected}
                    />
                </div>
            </td>
        </tr>
    );

    function updateCategory(category: Category) {
        if (!props.transaction.id) return;
        transactionImport.SetCategory(props.transaction.id, category);
        setIsAutofilled(false);
    }

    function toggleSaveDefault() {
        if (!props.transaction.memo || !props.transaction.category) return;

        if (props.transaction.saveDefault) {
            transactionImport.RemoveDefault(props.transaction.memo);
        } else {
            transactionImport.AddDefault(
                props.transaction.memo,
                props.transaction.category
            );
        }
    }

    function toggleSelected(value: boolean) {
        if (!props.transaction.id) return;
        transactionImport.SetSelected(props.transaction.id, value);
    }
}

export default ImportTableRow;

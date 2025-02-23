import { FormValues } from "../hooks/useFormValues";
import styles from "../styles/TransactionTable.module.css";
import TransactionQuery from "../types/TransactionQuery";
import { classList } from "../utils/HtmlHelper";
import { ExpandDownIcon, ExpandUpIcon } from "../utils/Icons";

interface TransactionTableHeaderCellProps {
    formValues: FormValues<TransactionQuery>;
    columnName: string;
    width?: string | number;
}

function TransactionTableHeaderCell(props: TransactionTableHeaderCellProps) {
    const { formValues, columnName } = props;
    const isActive =
        formValues.values.orderBy?.toLowerCase() === columnName.toLowerCase();

    // always show asc if not active
    const currentOrder =
        !isActive || formValues.values.order === "asc" ? "asc" : "desc";
    const targetOrder = !isActive || currentOrder === "desc" ? "asc" : "desc";
    const iconClass = classList(
        styles.orderBtn,
        isActive ? styles.activeOrder : ""
    );

    return (
        <th
            onClick={setOrdering}
            title={`Sort ${columnName} ${targetOrder === "asc" ? "ascending" : "descending"}`}
            style={{ width: props.width }}
        >
            {props.columnName}

            {currentOrder === "asc" ? (
                <ExpandUpIcon className={iconClass} />
            ) : (
                <ExpandDownIcon className={iconClass} />
            )}
        </th>
    );

    function setOrdering() {
        props.formValues.setValues({
            ...formValues.values,
            orderBy: columnName,
            order: targetOrder,
        });
    }
}

export default TransactionTableHeaderCell;

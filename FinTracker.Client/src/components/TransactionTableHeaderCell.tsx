import { FormValues } from "../hooks/useFormValues";
import styles from "../styles/TransactionTable.module.css";
import TransactionQuery from "../types/TransactionQuery";
import { classList } from "../utils/HtmlHelper";
import { ExpandDownIcon, ExpandUpIcon } from "../utils/Icons";

interface TransactionTableHeaderCellProps {
    formValues: FormValues<TransactionQuery>;
    columnName: string;
    className?: string;
}

function TransactionTableHeaderCell(props: TransactionTableHeaderCellProps) {
    const { formValues, columnName, className } = props;
    const isActive =
        formValues.values.orderBy?.toLowerCase() === columnName.toLowerCase();

    // always show asc if not active
    const currentOrder =
        !isActive || formValues.values.order === "asc" ? "asc" : "desc";
    const targetOrder = isActive && currentOrder === "asc" ? "desc" : "asc";
    const iconClass = classList(
        styles.orderBtn,
        isActive ? styles.activeOrder : ""
    );

    const title = `Sort ${columnName} ${targetOrder === "asc" ? "ascending" : "descending"}`;
    const Icon = currentOrder === "asc" ? ExpandUpIcon : ExpandDownIcon;

    return (
        <th onClick={setOrdering} title={title} className={className}>
            {props.columnName}

            <Icon className={classList(iconClass, "themed")} />
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

import SortDescIcon from "../assets/Expand_down.svg";
import SortAscIcon from "../assets/Expand_up.svg";
import { FormValues } from "../hooks/useFormValues";
import styles from "../styles/TransactionTable.module.css";
import TransactionQuery from "../types/TransactionQuery";
import { classList } from "../utils/htmlHelper";

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
    const icon = currentOrder === "asc" ? SortAscIcon : SortDescIcon;
    const targetOrder = !isActive || currentOrder === "desc" ? "asc" : "desc";

    return (
        <th
            onClick={setOrdering}
            title={`Sort ${columnName} ${targetOrder === "asc" ? "ascending" : "descending"}`}
            style={{ width: props.width }}
        >
            {props.columnName}

            <img
                src={icon}
                className={classList(
                    styles.orderBtnHolder,
                    isActive ? styles.activeOrder : ""
                )}
            />
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

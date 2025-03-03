import styles from "../styles/TransactionTable.module.css";
import TransactionQuery from "../types/TransactionQuery";
import { classList } from "../utils/HtmlHelper";
import { ExpandDownIcon, ExpandUpIcon } from "../utils/Icons";

interface TransactionTableHeaderCellProps {
    order: [
        TransactionQuery,
        React.Dispatch<React.SetStateAction<TransactionQuery>>,
    ];
    columnName: string;
    className?: string;
}

function TransactionTableHeaderCell(props: TransactionTableHeaderCellProps) {
    const {
        order: [orderQuery, setOrderQuery],
        columnName,
        className,
    } = props;

    const isActive =
        orderQuery.orderBy?.toLowerCase() === columnName.toLowerCase();

    // always show asc if not active
    const currentOrder =
        !isActive || orderQuery.order === "asc" ? "asc" : "desc";
    const targetOrder = isActive && currentOrder === "asc" ? "desc" : "asc";
    const iconClass = classList(
        styles.orderBtn,
        isActive ? styles.activeOrder : ""
    );

    const title = `Sort ${columnName} ${targetOrder === "asc" ? "ascending" : "descending"}`;
    const Icon = currentOrder === "asc" ? ExpandUpIcon : ExpandDownIcon;

    return (
        <th onClick={applyOrdering} title={title} className={className}>
            {props.columnName}

            <Icon className={classList(iconClass, "themed")} />
        </th>
    );

    function applyOrdering() {
        setOrderQuery({
            orderBy: columnName,
            order: targetOrder,
        });
    }
}

export default TransactionTableHeaderCell;

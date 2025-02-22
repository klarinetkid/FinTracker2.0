import styles from "../styles/GroupedTable.module.css";
import Table from "./Table";

interface GroupedTableProps {
    children?: React.ReactNode;
}

function GroupedTable(props: GroupedTableProps) {
    return <Table className={styles.table}>{props.children}</Table>;
}

export default GroupedTable;

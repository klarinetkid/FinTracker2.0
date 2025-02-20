import style from "../styles/GroupedTable.module.css";
import Table from "./Table";

interface GroupedTableProps {
    children?: React.ReactNode;
}

function GroupedTable(props: GroupedTableProps) {
    return <Table className={style.table}>{props.children}</Table>;
}

export default GroupedTable;

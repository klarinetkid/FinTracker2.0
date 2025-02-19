import style from "../styles/GroupedTable.module.css";
import Table from "./Table";

interface GroupedTableProps {
    selectable?: boolean;
    children?: React.ReactNode;
}

function GroupedTable(props: GroupedTableProps) {
    return (
        <Table className={style.table} selectable={props.selectable}>
            {props.children}
        </Table>
    );
}

export default GroupedTable;

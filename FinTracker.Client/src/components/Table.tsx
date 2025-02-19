import styles from "../styles/Table.module.css";
import { classList } from "../utils/htmlHelper";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
    selectable?: boolean;
}

function Table(props: TableProps) {
    const { selectable, ...rest } = props;

    return (
        <table
            {...rest}
            className={classList(
                styles.table,
                selectable ? styles.selectable : "",
                props.className
            )}
        />
    );
}

export default Table;

import styles from "../styles/Table.module.css";
import { classList } from "../utils/htmlHelper";

function Table(props: React.TableHTMLAttributes<HTMLTableElement>) {
    return (
        <table
            {...props}
            className={classList(styles.table, props.className)}
        />
    );
}

export default Table;

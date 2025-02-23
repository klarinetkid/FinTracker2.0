import styles from "../styles/Table.module.css";
import { classList } from "../utils/HtmlHelper";

//React.TableHTMLAttributes<HTMLTableElement>
function Table(
    props: React.DetailedHTMLProps<
        React.TableHTMLAttributes<HTMLTableElement>,
        HTMLTableElement
    >
) {
    return (
        <table
            {...props}
            className={classList(styles.table, props.className)}
        />
    );
}

export default Table;

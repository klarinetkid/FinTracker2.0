import styles from "../styles/Control.module.css";
import { classList } from "../utils/HtmlHelper";

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
            {...props}
            className={classList(styles.control, props.className)}
        />
    );
}

export default Select;

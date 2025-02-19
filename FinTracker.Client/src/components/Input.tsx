import styles from "../styles/Control.module.css";
import { classList } from "../utils/htmlHelper";

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={classList(styles.control, props.className)}
        />
    );
}

export default Input;

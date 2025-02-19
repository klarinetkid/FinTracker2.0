import styles from "../styles/FormGroup.module.css";
import { classList } from "../utils/htmlHelper";

function FormGroup(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={classList(styles.formGroup, props.className)}
        />
    );
}

export default FormGroup;

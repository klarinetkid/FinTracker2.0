import styles from "../styles/FormGroup.module.css";
import { classList } from "../utils/htmlHelper";

interface FormGroupProps {
    fieldName: string;
    children?: React.ReactNode;
    error?: string;
}

function FormGroup(props: FormGroupProps) {
    return (
        <div
            className={classList(
                styles.formGroup,
                props.error ? styles.error : ""
            )}
        >
            <h4>{props.fieldName}</h4>
            {props.children}

            {props.error ? (
                <div className={styles.errorMessage}>{props.error}</div>
            ) : (
                ""
            )}
        </div>
    );
}

export default FormGroup;

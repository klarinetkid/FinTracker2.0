import styles from "../styles/FormGroup.module.css";
import { classList } from "../utils/HtmlHelper";

interface FormGroupProps {
    fieldName: string;
    children?: React.ReactNode;
    error?: string;
}

function FormGroup(props: FormGroupProps) {
    const { fieldName, children, error } = props;

    return (
        <div className={classList(styles.formGroup, error ? styles.error : "")}>
            <h4>{fieldName}</h4>
            {children}

            {error ? <div className={styles.errorMessage}>{error}</div> : ""}
        </div>
    );
}

export default FormGroup;

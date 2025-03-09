import { FieldError } from "react-hook-form";
import styles from "../styles/FormGroup.module.css";
import { classList } from "../utils/HtmlHelper";

interface FormGroupProps {
    fieldName: string;
    children?: React.ReactNode;
    error?: FieldError | boolean;
}

function FormGroup(props: FormGroupProps) {
    const { fieldName, children, error } = props;

    return (
        <div className={classList(styles.formGroup, error ? styles.error : "")}>
            <h4>{fieldName}</h4>
            {children}

            {error && (
                <div className={styles.errorMessage}>{getErrorMessage()}</div>
            )}
        </div>
    );

    function getErrorMessage() {
        if (!error || typeof error !== "object") return "";
        if (error.message) return error.message;

        switch (error.type) {
            case "required":
                return `The ${fieldName} field is required.`;
            case "pattern":
                return "Invalid format.";
        }

        return "";
    }
}

export default FormGroup;

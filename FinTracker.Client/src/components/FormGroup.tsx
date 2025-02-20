import styles from "../styles/FormGroup.module.css";

interface FormGroupProps {
    fieldName: string;
    children?: React.ReactNode;
}

function FormGroup(props: FormGroupProps) {
    return (
        <div className={styles.formGroup}>
            <h4>{props.fieldName}</h4>
            {props.children}
        </div>
    );
}

export default FormGroup;

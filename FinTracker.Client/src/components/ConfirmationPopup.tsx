import styles from "../styles/ConfirmationPopup.module.css";
import { classList } from "../utils/HtmlHelper";
import Button from "./Button";
import ButtonFill from "./ButtonFill";

interface ConfirmationPopupProps {
    title: string;
    body: string;
    active: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmationPopup(props: ConfirmationPopupProps) {
    const { title, body, active, onConfirm, onCancel } = props;

    return (
        <div
            className={classList(styles.container, active ? styles.active : "")}
        >
            <div className={styles.overlay} onClick={onCancel}></div>
            <div className={styles.popup}>
                <div className={styles.title}>
                    <h2>{title}</h2>
                </div>
                <div className={styles.body}>{body}</div>
                <div className={styles.footer}>
                    <ButtonFill onClick={onConfirm}>Confirm</ButtonFill>
                    <Button onClick={onCancel}>Cancel</Button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationPopup;

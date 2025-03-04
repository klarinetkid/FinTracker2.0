import styles from "../styles/ToastNotification.module.css";
import { classList } from "../utils/HtmlHelper";

export type ToastNotificationProps = {
    type: "success" | "error";
    title: string;
    body?: string;
};

function ToastNotification(props: ToastNotificationProps) {
    const { title, type, body } = props;

    return (
        <div className={classList(styles.toast, styles[type])}>
            <div className={styles.title}>{title}</div>
            <div className={styles.body}>{body}</div>
        </div>
    );
}

export default ToastNotification;

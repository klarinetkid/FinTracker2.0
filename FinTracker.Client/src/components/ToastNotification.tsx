import { useEffect } from "react";
import styles from "../styles/ToastNotification.module.css";
import { classList } from "../utils/HtmlHelper";
import ToastManager from "../utils/ToastManager";
import appsettings from "../appsettings.json";

export type ToastNotificationProps = {
    type: "success" | "error";
    title: string;
    body?: string;
    id?: string;
};

function ToastNotification(props: ToastNotificationProps) {
    const { title, type, body, id } = props;

    useEffect(() => {
        if (id)
            setTimeout(() => {
                ToastManager.expireToast(id);
            }, appsettings.toastExpiryMs);
    }, []);

    return (
        <div className={classList(styles.toast, styles[type])}>
            <div className={styles.title}>{title}</div>
            <div className={styles.body}>{body}</div>
        </div>
    );
}

export default ToastNotification;

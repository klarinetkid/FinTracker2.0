import { useState } from "react";
import {
    ToastNotificationContext,
    ToastNotificationManager,
} from "./ToastNotificationContext";
import { ToastNotificationProps } from "../components/ToastNotification";
import styles from "../styles/ToastNotification.module.css";

function ToastNotificationProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const notifs = useState<ToastNotificationProps[]>([]);

    const notifMgr = new ToastNotificationManager(notifs);

    return (
        <ToastNotificationContext.Provider value={notifMgr}>
            {children}
            <div className={styles.holder}>{notifMgr.Render()}</div>
        </ToastNotificationContext.Provider>
    );
}

export default ToastNotificationProvider;

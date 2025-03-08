import React, { useEffect, useState } from "react";
import ToastManager from "../utils/ToastManager";
import { ToastNotificationProps } from "../components/ToastNotification";
import ToastNotification from "../components/ToastNotification";
import styles from "../styles/ToastNotification.module.css";

function ToastNotificationProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [notifs, setNotifs] = useState<ToastNotificationProps[]>([]);

    useEffect(() => {
        const handleToastAdd = (notif: ToastNotificationProps) => {
            setNotifs((prevNotifs) => [...prevNotifs, notif]);
        };

        const handleToastExpire = (id: string) => {
            setNotifs((prevNotifs) => prevNotifs.filter((n) => n.id !== id));
        };

        ToastManager.on(handleToastAdd, handleToastExpire);
        return () => {
            ToastManager.off(handleToastAdd, handleToastExpire);
        };
    }, []);

    return (
        <>
            {children}
            <div className={styles.holder}>
                {notifs.map((n) => (
                    <ToastNotification key={n.id} {...n} />
                ))}
            </div>
        </>
    );
}

export default ToastNotificationProvider;

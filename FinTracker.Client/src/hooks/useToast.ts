import { useContext } from "react";
import { ToastNotificationContext } from "../contexts/ToastNotificationContext";

function useToast() {
    const toastCtx = useContext(ToastNotificationContext);
    return toastCtx;
}

function nogo() {
    return "xyz";
}

export default useToast;

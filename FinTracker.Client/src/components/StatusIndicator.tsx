import styles from "../styles/StatusIndicator.module.css";
import { classList } from "../utils/HtmlHelper";
import { StatusHolderIcon } from "../utils/Icons";

interface LoadingIndicatorProps {
    status: "loading" | "error" | "info" | "success";
    message?: string;
}
function StatusIndicator({ status, message }: LoadingIndicatorProps) {
    return (
        <div className={classList(styles.indicator, getClassName())}>
            <div className={styles.background}></div>
            <div className={styles.message}>
                {message ?? getDefaultMessage()}
                {status === "loading" ? "..." : ""}
            </div>
            <StatusHolderIcon />
        </div>
    );

    function getDefaultMessage(): string {
        switch (status) {
            case "loading":
                return "Loading";
            case "error":
                return "An unexpected error has occurred.";
            case "info":
                return "";
            case "success":
                return "Success";
        }
    }

    function getClassName(): string {
        switch (status) {
            case "loading":
                return styles.loading;
            case "error":
                return styles.error;
            case "info":
                return styles.info;
            case "success":
                return styles.success;
        }
    }
}

export default StatusIndicator;

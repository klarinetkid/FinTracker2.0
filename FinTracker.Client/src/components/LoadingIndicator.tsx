import styles from "../styles/LoadingIndicator.module.css";
import { LoadingIcon } from "../utils/Icons";

interface LoadingIndicatorProps {
    message?: string;
}
function LoadingIndicator({ message }: LoadingIndicatorProps) {
    return (
        <div className={styles.loading}>
            <LoadingIcon className="notheme" />
            <div className={styles.message}>{message ?? "Loading"}...</div>
        </div>
    );
}

export default LoadingIndicator;

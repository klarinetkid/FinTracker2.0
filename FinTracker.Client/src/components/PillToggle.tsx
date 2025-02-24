import styles from "../styles/PillToggle.module.css";
import { classList } from "../utils/HtmlHelper";

interface PillToggleProps {
    title: string;
    isActive: boolean;
    onToggle?: (isActive: boolean) => void;
    disabled?: boolean;
}

function PillToggle(props: PillToggleProps) {
    const { title, isActive, onToggle, disabled } = props;

    return (
        <button
            className={classList(
                styles.pill,
                isActive ? styles.active : "",
                disabled ? styles.disabled : ""
            )}
            onClick={() => onToggle && onToggle(!isActive)}
        >
            {title}
        </button>
    );
}

export default PillToggle;

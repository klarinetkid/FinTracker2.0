import styles from "../styles/PillToggle.module.css";
import { classList } from "../utils/htmlHelper";

interface PillToggleProps {
    title: string;
    isActive: boolean;
    onToggle?: (isActive: boolean) => void;
    disabled?: boolean;
}

function PillToggle(props: PillToggleProps) {
    return (
        <button
            className={classList(
                styles.pill,
                props.isActive ? styles.active : "",
                props.disabled ? styles.disabled : ""
            )}
            onClick={() => props.onToggle && props.onToggle(!props.isActive)}
        >
            {props.title}
        </button>
    );
}

export default PillToggle;

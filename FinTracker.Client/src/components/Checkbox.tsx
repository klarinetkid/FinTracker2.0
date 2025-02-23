import { useState } from "react";
import styles from "../styles/Checkbox.module.css";
import { CheckRingCircleIcon, CheckRingIcon } from "../utils/Icons";
import { classList } from "../utils/HtmlHelper";
interface CheckboxProps {
    checked?: boolean;
    onChange?: (value: boolean) => void;
}

function Checkbox(props: CheckboxProps) {
    const [isChecked, setIsChecked] = useState(props.checked ?? false);

    // controlled if onchange
    const value = props.onChange ? props.checked : isChecked;

    return (
        <button
            className={classList(styles.cbox, value ? styles.active : "")}
            onClick={toggleCheckboxState}
        >
            {value ? <CheckRingIcon /> : <CheckRingCircleIcon />}
        </button>
    );

    function toggleCheckboxState() {
        if (props.onChange) {
            setIsChecked(!isChecked);
            props.onChange(!isChecked);
        }
    }
}

export default Checkbox;

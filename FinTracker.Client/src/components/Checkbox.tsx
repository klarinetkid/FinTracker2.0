import { useState } from "react";
import styles from "../styles/Checkbox.module.css";
import { CheckRingCircleIcon, CheckRingIcon } from "../utils/Icons";
import { classList } from "../utils/HtmlHelper";
interface CheckboxProps {
    checked?: boolean;
    onChange?: (value: boolean) => void;
}

function Checkbox(props: CheckboxProps) {
    const { checked, onChange } = props;

    const [isChecked, setIsChecked] = useState(checked ?? false);

    // controlled if onchange
    const value = onChange ? checked : isChecked;
    const Icon = value ? CheckRingIcon : CheckRingCircleIcon;

    return (
        <button
            className={classList(styles.cbox, value ? styles.active : "")}
            onClick={toggleCheckboxState}
            type="button"
        >
            <Icon className="themed" />
        </button>
    );

    function toggleCheckboxState() {
        if (onChange) {
            setIsChecked(!value);
            onChange(!value);
        }
    }
}

export default Checkbox;

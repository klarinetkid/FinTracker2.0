import { useState } from "react";
import CheckedIcon from "../assets/Check_ring.svg?react";
import UncheckedIcon from "../assets/Check_ring_circle.svg?react";
import style from "../styles/Checkbox.module.css";
interface CheckboxProps {
    checked?: boolean;
    onChange?: (value: boolean) => void;
}

function Checkbox(props: CheckboxProps) {
    const [isChecked, setIsChecked] = useState(props.checked ?? false);

    // controlled if no onchange
    const value = props.onChange ? props.checked : isChecked;

    return (
        <button className={style.cbox} onClick={toggleCheckboxState}>
            {value ? (
                <CheckedIcon stroke="rgb(33, 53, 71)" />
            ) : (
                <UncheckedIcon stroke="rgb(33, 53, 71)" />
            )}
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

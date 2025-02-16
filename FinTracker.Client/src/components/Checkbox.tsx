import { useState } from "react";
import CheckedIcon from "../assets/Check_ring.svg?react";
import UncheckedIcon from "../assets/Check_ring_circle.svg?react";
import "../styles/Checkbox.css";
interface CheckboxProps {
    checked?: boolean;
    onChange?: (value: boolean) => void;
}

function Checkbox(props: CheckboxProps) {
    const [isChecked, setIsChecked] = useState(props.checked ?? false);

    return (
        <div className="checkbox" onClick={toggleCheckboxState}>
            {isChecked ? (
                <CheckedIcon stroke="rgb(33, 53, 71)" />
            ) : (
                <UncheckedIcon stroke="rgb(33, 53, 71)" />
            )}
        </div>
    );

    function toggleCheckboxState() {
        setIsChecked(!isChecked);
        if (props.onChange) props.onChange(!isChecked);
    }
}

export default Checkbox;

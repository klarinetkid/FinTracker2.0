import React from "react";
import styles from "../styles/Control.module.css";
import { classList } from "../utils/HtmlHelper";
import { UseFormRegisterReturn } from "react-hook-form";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    registration?: UseFormRegisterReturn;
}

function Input(props: InputProps) {
    const { registration, ...rest } = props;

    return (
        <input
            {...rest}
            {...registration}
            className={classList(styles.control, rest.className)}
        />
    );
}

export default Input;

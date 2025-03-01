import React from "react";
import styles from "../styles/Control.module.css";
import { classList } from "../utils/HtmlHelper";

//interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//    isError?: boolean;
//}

//function Input(props: InputProps) {
//    const { isError, ...rest } = props;

//    return (
//        <input
//            {...rest}
//            className={classList(
//                styles.control,
//                isError ? styles.error : "",
//                props.className
//            )}
//        />
//    );
//}


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    registration?: any
}

function Input(props: InputProps) {

    return (
        <input
            {...props}
            {...props.registration}
            className={classList(
                styles.control,
                props.className
            )}
        />
    );
}

export default Input;

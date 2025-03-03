import { UseFormRegisterReturn } from "react-hook-form";
import styles from "../styles/Control.module.css";
import { classList } from "../utils/HtmlHelper";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    registration?: UseFormRegisterReturn;
}

function Select(props: SelectProps) {
    const { registration, ...rest } = props;

    return (
        <select
            {...registration}
            {...rest}
            className={classList(styles.control, rest.className)}
        />
    );
}

export default Select;

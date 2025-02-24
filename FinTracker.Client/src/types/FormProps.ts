import { SyntheticEvent } from "react";
import { FormValues } from "../hooks/useFormValues";

interface FormProps<T> {
    formValues: FormValues<T>;
    onSubmit: (event: SyntheticEvent) => void;
    onDelete: () => void;
    onCancel: () => void;
}

export default FormProps;

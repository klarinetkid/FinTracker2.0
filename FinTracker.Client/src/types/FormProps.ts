import { FieldValues, SubmitHandler } from "react-hook-form";

type FormProps<T> = {
    onSubmit: SubmitHandler<FieldValues>;
    onCancel: () => void;
    onDelete: () => void;
    values?: T;
};

export default FormProps;

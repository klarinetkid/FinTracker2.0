import { useState } from "react";
import { ErrorResponse } from "../services/baseService";

export type FormValues<T> = {
    values: T;
    setValues: React.Dispatch<React.SetStateAction<T>>;
    updateValue: (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => void;

    getFieldError: (field: string) => string | undefined;
    setErrors: React.Dispatch<React.SetStateAction<ErrorResponse | undefined>>;
};

export function useFormValues<T>(defaultValues: T): FormValues<T> {
    const [values, setValues] = useState<T>(defaultValues);
    const [errorResponse, setErrors] = useState<ErrorResponse>();

    const updateValue = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = event.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    const getFieldError = (field: string): string | undefined => {
        const errors = errorResponse?.errors?.[field];
        return errors ? errors[0] : undefined;
    };

    return {
        values,
        setValues,
        updateValue,
        getFieldError,
        setErrors,
    };
}

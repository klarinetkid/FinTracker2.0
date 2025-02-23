import { useState } from "react";
import { ErrorResponse } from "../services/baseService";

type InputSelectChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>;

export class FormValues<T> {
    public values: T;
    public setValues: React.Dispatch<React.SetStateAction<T>>;

    private errorResponse: ErrorResponse | undefined;
    public setErrors: React.Dispatch<
        React.SetStateAction<ErrorResponse | undefined>
    >;

    public updateValue: (event: InputSelectChangeEvent) => void;
    private _updateValue(event: InputSelectChangeEvent): void {
        const { name, value } = event.target;
        this.setValues({
            ...this.values,
            [name]: value,
        });
    }

    public getFieldError(field: string): string | undefined {
        const errors = this.errorResponse?.errors?.[field];
        return errors ? errors[0] : undefined;
    }

    constructor(
        values: T,
        setValues: typeof this.setValues,
        errorResponse: typeof this.errorResponse,
        setErrors: typeof this.setErrors
    ) {
        this.values = values;
        this.setValues = setValues;
        this.errorResponse = errorResponse;
        this.setErrors = setErrors;

        this.updateValue = this._updateValue.bind(this);
    }
}

export function useFormValues<T>(defaultValues: T): FormValues<T> {
    const [values, setValues] = useState<T>(defaultValues);
    const [errorResponse, setErrors] = useState<ErrorResponse>();

    return new FormValues(values, setValues, errorResponse, setErrors);
}

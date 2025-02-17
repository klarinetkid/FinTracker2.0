import { useState } from "react";

export default function useFormValues<T>(
    defaultValues: T
): [
    T,
    React.Dispatch<React.SetStateAction<T>>,
    (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => void,
] {
    const [formValues, setFormValues] = useState<T>(defaultValues);

    const updateFormValues = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        //console.log({
        //    ...formValues,
        //    [event.target.name]: value,
        //});
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    return [formValues, setFormValues, updateFormValues];
}

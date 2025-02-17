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
        let value: string | number | boolean = event.target.value;

        const type = event.target.getAttribute("data-field-type");
        if (type) {
            switch (type) {
                case "boolean":
                    value = value.toLowerCase() === "true";
                    break;
                case "int":
                    value = parseInt(value) || 0;
                    break;
                case "float":
                    value = parseFloat(value) || 0;
                    break;
            }
        }
        //console.log({
        //    ...formValues,
        //    [event.target.name]: value,
        //});
        setFormValues({
            ...formValues,
            [event.target.name]: value,
        });
    };

    return [formValues, setFormValues, updateFormValues];
}

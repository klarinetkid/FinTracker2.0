import { useState, useEffect } from "react";

function useDebounce<T>(
    value: T,
    delay: number
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            // not a good comparison, just want to avoid
            // setting if both are empty objects when reset
            if (JSON.stringify(value) !== JSON.stringify(debouncedValue))
                setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return [debouncedValue, setDebouncedValue];
}

export default useDebounce;

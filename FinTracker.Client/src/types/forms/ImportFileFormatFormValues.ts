import ImportFileFormat from "../ImportFileFormat";
import ImportFileFormatViewModel from "../models/ImportFileFormatViewModel";

export type FormatFormValues = {
    id: number;
    importFileFormatName: string;
    dateKey: string;
    memoFormat: string;
    amountKey: string;
    invertAmounts: string;
    headerLines: string;
    delimiter: string;
    image: string;
};

export const FormatFormDefaults = {
    id: 0,
    importFileFormatName: "",
    dateKey: "",
    memoFormat: "",
    amountKey: "",
    invertAmounts: "false",
    headerLines: "",
    delimiter: "",
    image: "",
};

export function FormatFormValuesToModel(
    formValues: FormatFormValues
): ImportFileFormatViewModel {
    const x = formValues.invertAmounts.toLowerCase() === "true";
    return {
        ...formValues,
        invertAmounts: formValues.invertAmounts.toLowerCase() === "true",
        headerLines: parseInt(formValues.headerLines) || undefined,
    };
}

export function ImportFileFormatToFormValues(
    format: ImportFileFormat
): FormatFormValues {
    return {
        ...format,
        invertAmounts: format.invertAmounts.toString(),
        headerLines: format.headerLines.toString(),
        image: format.image ?? "",
    };
}

export default FormatFormValues;

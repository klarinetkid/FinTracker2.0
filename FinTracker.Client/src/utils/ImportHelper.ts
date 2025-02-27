import { FileContent } from "use-file-picker/types";
import ImportFormat from "../types/ImportFormat";

type ImportParams = {
    format: ImportFormat;
    filesContent: FileContent<ArrayBuffer>[];
};
export function setImportParams(params: ImportParams) {
    localStorage.setItem("importParams", JSON.stringify(params));
}

export function getImportParams(): ImportParams | undefined {
    try {
        const params = localStorage.getItem("importParams");
        if (params === null) throw new Error("Empty Params");
        return JSON.parse(params);
    } catch {
        return undefined;
    }
}

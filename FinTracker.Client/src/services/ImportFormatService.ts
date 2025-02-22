import ImportFormat from "../types/ImportFormat";
import ImportFormatViewModel from "../types/ImportFormatViewModel";
import BaseService from "./baseService";

class ImportFormatService extends BaseService {
    constructor() {
        super("/ImportFormats");
    }

    getFormats(): Promise<ImportFormat[]> {
        return this.get("");
    }

    createFormat(model: ImportFormatViewModel): Promise<ImportFormat> {
        return this.post<ImportFormat>("", model);
    }

    putFormat(model: ImportFormatViewModel): Promise<ImportFormat> {
        const { id, ...values } = model;
        return this.put<ImportFormat>(`/${id}`, values);
    }

    deleteFormat(id: number): Promise<void> {
        return this.delete(`/${id}`);
    }
}

export default new ImportFormatService();

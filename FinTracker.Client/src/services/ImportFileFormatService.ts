import ImportFileFormat from "../types/ImportFileFormat";
import ImportFileFormatViewModel from "../types/models/ImportFileFormatViewModel";
import BaseService from "./baseService";

class ImportFileFormatService extends BaseService {
    constructor() {
        super("/ImportFileFormats");
    }

    getFormats(): Promise<ImportFileFormat[]> {
        return this.get("");
    }

    createFormat(model: ImportFileFormatViewModel): Promise<ImportFileFormat> {
        return this.post<ImportFileFormat>("", model);
    }

    putFormat(model: ImportFileFormatViewModel): Promise<ImportFileFormat> {
        const { id, ...values } = model;
        return this.put<ImportFileFormat>(`/${id}`, values);
    }

    deleteFormat(id: number): Promise<void> {
        return this.delete(`/${id}`);
    }
}

export default new ImportFileFormatService();

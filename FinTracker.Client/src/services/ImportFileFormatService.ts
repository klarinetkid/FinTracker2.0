import ImportFileFormat from "../types/ImportFileFormat";
import BaseService from "./baseService";

class ImportFileFormatService extends BaseService {
    getFormats(): Promise<ImportFileFormat[]> {
        return this.get("/ImportFileFormats");
    }

    createFormat(format: ImportFileFormat): Promise<ImportFileFormat> {
        return this.post<ImportFileFormat>("/ImportFileFormats", format);
    }

    putFormat(format: ImportFileFormat): Promise<ImportFileFormat> {
        return this.put<ImportFileFormat>(
            `/ImportFileFormats/${format.id}`,
            format
        );
    }

    deleteFormat(format: ImportFileFormat): Promise<void> {
        return this.delete(`/ImportFileFormats/${format.id}`);
    }
}

export default new ImportFileFormatService();

import ImportFileFormat from "../types/ImportFileFormat";
import ImportFileFormatViewModel from "../types/models/ImportFileFormatViewModel";
import BaseService from "./baseService";

class ImportFileFormatService extends BaseService {
    getFormats(): Promise<ImportFileFormat[]> {
        return this.get("/ImportFileFormats");
    }

    createFormat(format: ImportFileFormatViewModel): Promise<ImportFileFormat> {
        return this.post<ImportFileFormat>("/ImportFileFormats", format);
    }

    putFormat(format: ImportFileFormatViewModel): Promise<ImportFileFormat> {
        return this.put<ImportFileFormat>(
            `/ImportFileFormats/${format.id}`,
            format
        );
    }

    deleteFormat(formatId: number): Promise<void> {
        return this.delete(`/ImportFileFormats/${formatId}`);
    }
}

export default new ImportFileFormatService();

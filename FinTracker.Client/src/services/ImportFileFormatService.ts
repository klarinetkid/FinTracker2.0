import ImportFileFormat from "../types/ImportFileFormat";
import BaseService from "./baseService";


class ImportFileFormatService extends BaseService {

    getFormats(): Promise<ImportFileFormat[]> {
        return this.get('/ImportFileFormats')
    }

}

export default new ImportFileFormatService();
import BaseService from "./baseService";

class MetadataService extends BaseService {
    getAvailableYears(): Promise<number[]> {
        return this.get<number[]>("/Metadata/AvailableYears");
    }
}

export default new MetadataService();

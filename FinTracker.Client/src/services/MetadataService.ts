import BaseService from "./baseService";

class MetadataService extends BaseService {
    constructor() {
        super("/Metadata");
    }

    getAvailableYears(): Promise<number[]> {
        return this.get<number[]>("/AvailableYears");
    }
}

export default new MetadataService();

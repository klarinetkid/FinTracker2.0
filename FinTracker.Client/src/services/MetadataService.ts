import axios from "axios";
import CountsViewModel from "../types/CountsViewModel";
import BaseService from "./BaseService";

class MetadataService extends BaseService {
    constructor() {
        super("/Metadata");
    }

    getAvailableYears(): Promise<number[]> {
        return this.get<number[]>("/AvailableYears");
    }

    async getAboutInfo() {
        //return this.get("/Counts");
        const response = await axios
            .create()
            .get<CountsViewModel>(`${window.env.API_BASE_URL}/Metadata/Counts`);
        return {
            counts: response.data,
            apiVersion: response.headers["x-api-version"],
        };
    }
}

export default new MetadataService();

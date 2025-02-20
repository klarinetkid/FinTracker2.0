import moment from "moment";
import Breakdown from "../types/Breakdown";
import BaseService from "./baseService";

class BreakdownService extends BaseService {
    constructor() {
        super("/Breakdown");
    }

    getBreakdown(start: string | Date, end: string | Date): Promise<Breakdown> {
        const params = {
            start: moment(start).format("yyyy-MM-DD"),
            end: moment(end).format("yyyy-MM-DD"),
            includes: ["Transactions"],
        };
        return this.get<Breakdown>("/", {
            params,
            paramsSerializer: { indexes: null },
        });
    }

    getYearSummaries(year: number): Promise<Breakdown[]> {
        return this.get<Breakdown[]>(`/Monthly/${year}`);
    }
}

export default new BreakdownService();

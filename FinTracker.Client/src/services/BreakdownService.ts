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

    getWeeklyBreakdownsForYear(year: number): Promise<Breakdown[]> {
        return this.get<Breakdown[]>(`/Weekly/${year}`);
    }

    getMonthlyBreakdownsForYear(year: number): Promise<Breakdown[]> {
        return this.get<Breakdown[]>(`/Monthly/${year}`);
    }

    getYearBreakdowns(): Promise<Breakdown[]> {
        return this.get<Breakdown[]>(`/Yearly`);
    }
}

export default new BreakdownService();

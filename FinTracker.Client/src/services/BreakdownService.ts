import Breakdown from "../types/Breakdown";
import BreakdownCollection from "../types/BreakdownCollection";
import { formatDateOnly } from "../utils/DateHelper";
import BaseService from "./BaseService";

class BreakdownService extends BaseService {
    constructor() {
        super("/Breakdown");
    }

    getBreakdown(start: string | Date, end: string | Date): Promise<Breakdown> {
        const params = {
            start: formatDateOnly(start),
            end: formatDateOnly(end),
        };
        return this.get<Breakdown>("", { params });
    }

    getWeeklyBreakdownsForYear(year: number): Promise<BreakdownCollection> {
        return this.get(`/Weekly/${year}`);
    }

    getMonthlyBreakdownsForYear(year: number): Promise<BreakdownCollection> {
        return this.get(`/Monthly/${year}`);
    }

    getYearBreakdowns(): Promise<BreakdownCollection> {
        return this.get(`/Yearly`);
    }
}

export default new BreakdownService();

import moment from "moment";
import Breakdown from "../types/Breakdown";
import BaseService from "./BaseService";
import { formatDateOnly } from "../utils/DateHelper";

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

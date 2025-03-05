import TrendLineCollection from "../types/TrendLineCollection";
import TrendQuery from "../types/TrendQuery";
import BaseService from "./BaseService";

class TrendService extends BaseService {
    constructor() {
        super("/Trends");
    }

    getTrends(query: TrendQuery): Promise<TrendLineCollection> {
        return this.get("", {
            params: query,
            paramsSerializer: { indexes: null },
        });
    }
}

export default new TrendService();

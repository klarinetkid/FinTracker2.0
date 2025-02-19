import MemoCatgorizationViewModel from "../types/models/MemoCategorizationViewModel";
import BaseService from "./baseService";

class MemoCategorizationService extends BaseService {
    patchBatch(models: MemoCatgorizationViewModel[]): Promise<number> {
        return this.patch("/MemoCategorizations/$batch", models);
    }
}

export default new MemoCategorizationService();

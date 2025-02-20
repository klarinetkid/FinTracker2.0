import MemoCategorization from "../types/MemoCategorization";
import MemoCategorizationGroupViewModel from "../types/models/MemoCategorizationGroupViewModel";
import MemoCatgorizationViewModel from "../types/models/MemoCategorizationViewModel";
import BaseService from "./baseService";

class MemoCategorizationService extends BaseService {
    constructor() {
        super("/MemoCategorizations");
    }

    patchCategorization(
        model: MemoCatgorizationViewModel
    ): Promise<MemoCategorization> {
        const { id, ...values } = model;
        return this.patch(`/${id}`, values);
    }

    deleteCategorization(id: number): Promise<void> {
        return this.delete(`/${id}`);
    }

    getGrouped(): Promise<MemoCategorizationGroupViewModel[]> {
        return this.get("/Grouped");
    }

    patchBatch(models: MemoCatgorizationViewModel[]): Promise<number> {
        return this.patch("/$batch", models);
    }
}

export default new MemoCategorizationService();

import Category from "../types/Category";
import Grouping from "../types/Grouping";
import Memo from "../types/Memo";
import MemoViewModel from "../types/MemoViewModel";
import BaseService from "./baseService";

class MemoService extends BaseService {
    constructor() {
        super("/Memos");
    }

    patchCategorization(model: MemoViewModel): Promise<Memo> {
        const { id, ...values } = model;
        return this.patch(`/${id}`, values);
    }

    deleteMemo(id: number): Promise<void> {
        return this.delete(`/${id}`);
    }

    getGrouped(): Promise<Grouping<Category, Memo>[]> {
        return this.get("/Grouped");
    }

    patchBatch(models: MemoViewModel[]): Promise<number> {
        return this.patch("/$batch", models);
    }
}

export default new MemoService();

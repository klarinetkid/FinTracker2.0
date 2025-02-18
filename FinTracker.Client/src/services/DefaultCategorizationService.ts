import DefaultCatgorizationViewModel from "../types/models/DefaultCategorizationViewModel";
import BaseService from "./baseService";

class DefaultCategorizationService extends BaseService {
    patchBatch(
        defaultCategorizations: DefaultCatgorizationViewModel[]
    ): Promise<number> {
        return this.patch(
            "/DefaultCategorizations/$batch",
            defaultCategorizations
        );
    }
}

export default new DefaultCategorizationService();

import TransactionViewModel from "../types/models/TransactionViewModel";
import Transaction from "../types/Transaction";
import BaseService from "./baseService";

class TransactionService extends BaseService {
    constructor() {
        super("/Transactions");
    }

    patchTransaction(model: TransactionViewModel): Promise<Transaction> {
        const { id, ...values } = model;
        return this.patch(`/${id}`, values);
    }

    prepareImport(
        models: TransactionViewModel[]
    ): Promise<TransactionViewModel[]> {
        return this.post("/PrepareImport", models);
    }

    createBatch(models: TransactionViewModel[]): Promise<number> {
        return this.post("/$batch", models);
    }
}

export default new TransactionService();

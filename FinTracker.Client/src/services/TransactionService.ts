import TransactionViewModel from "../types/TransactionViewModel";
import PaginatedResponse from "../types/PaginatedResponse";
import Transaction from "../types/Transaction";
import TransactionQuery from "../types/TransactionQuery";
import BaseService from "./baseService";

class TransactionService extends BaseService {
    constructor() {
        super("/Transactions");
    }

    getTransactions(
        query: TransactionQuery
    ): Promise<PaginatedResponse<Transaction>> {
        return this.get("", { params: query });
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

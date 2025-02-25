import TransactionViewModel from "../types/TransactionViewModel";
import PaginatedResponse from "../types/PaginatedResponse";
import Transaction from "../types/Transaction";
import TransactionQuery from "../types/TransactionQuery";
import BaseService from "./BaseService";

class TransactionService extends BaseService {
    constructor() {
        super("/Transactions");
    }

    getTransactions(
        query: TransactionQuery
    ): Promise<PaginatedResponse<Transaction>> {
        return this.get("", { params: query });
    }

    createTransaction(
        model: TransactionViewModel
    ): Promise<TransactionViewModel> {
        return this.post("", model);
    }

    patchTransaction(model: TransactionViewModel): Promise<Transaction> {
        const { id, ...values } = model;
        return this.patch(`/${id}`, values);
    }

    deleteTransaction(id: number): Promise<void> {
        return this.delete(`${id}`);
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

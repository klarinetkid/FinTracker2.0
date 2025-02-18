import TransactionViewModel from "../types/models/TransactionViewModel";
import Transaction from "../types/Transaction";
import BaseService from "./baseService";

class TransactionService extends BaseService {
    patchTransaction(
        transaction: Pick<TransactionViewModel, "id" | "categoryId">
    ): Promise<Transaction> {
        return this.patch(`/Transactions/${transaction.id}`, transaction);
    }

    prepareImport(
        transactions: TransactionViewModel[]
    ): Promise<TransactionViewModel[]> {
        return this.post("/Transactions/PrepareImport", transactions);
    }

    createBatch(transactions: TransactionViewModel[]): Promise<number> {
        return this.post("/Transactions/$batch", transactions);
    }
}

export default new TransactionService();

import Transaction from "../types/Transaction";
import BaseService from "./baseService";


class TransactionService extends BaseService {

    patchTransaction(transaction: Pick<Transaction, 'id' | 'categoryId'>): Promise<Transaction> {
        return this.patch(`/Transaction/${transaction.id}`, transaction)
    }

}

export default new TransactionService();
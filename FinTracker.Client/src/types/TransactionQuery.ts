type TransactionQuery = {
    pageNumber?: number;
    search?: string;
    categoryId?: number;
    before?: string;
    after?: string;
};

export default TransactionQuery;

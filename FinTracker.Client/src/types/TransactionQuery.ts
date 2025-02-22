type TransactionQuery = {
    pageNumber?: number;
    search?: string;
    categoryId?: number;
    before?: string;
    after?: string;
    orderBy?: string;
    order?: string;
};

export default TransactionQuery;

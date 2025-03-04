type TransactionQuery = {
    pageNumber?: number;
    search?: string;
    categoryId?: number;
    before?: string;
    after?: string;
    moreThan?: number | string;
    lessThan?: number | string;
    orderBy?: string;
    order?: string;
    type?: string;
};

export default TransactionQuery;

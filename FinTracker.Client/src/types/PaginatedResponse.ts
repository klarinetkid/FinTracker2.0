type PaginatedResponse<T> = {
    results: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
};

export default PaginatedResponse;

type LocalPagination<T> = {
    pageSize: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    pageCount: number;
    currentItems: { item: T; index: number }[];
};

export default LocalPagination;

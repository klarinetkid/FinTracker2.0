import { useState } from "react";
import LocalPagination from "../types/LocalPagination";

export default function useLocalPagination<T>(
    items: T[],
    pageSize: number
): LocalPagination<T> {
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(items.length / pageSize);
    const currentItems = items
        .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
        .map((item, index) => ({
            item,
            index: currentPage * pageSize + index,
        }));

    return { pageSize, currentPage, setCurrentPage, totalPages, currentItems };
}

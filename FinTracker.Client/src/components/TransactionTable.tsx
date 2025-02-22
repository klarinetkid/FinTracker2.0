import { useEffect, useRef, useState } from "react";
import Table from "../components/Table";
import TransactionService from "../services/TransactionService";
import PaginatedResponse from "../types/PaginatedResponse";
import Transaction from "../types/Transaction";
import TransactionQuery from "../types/TransactionQuery";
import PaginationNav from "./PaginationNav";
import Spacer from "./Spacer";
import TransactionTableRow from "./TransactionTableRow";
import TransactionViewModel from "../types/TransactionViewModel";

interface TransactionTableProps {
    query?: TransactionQuery;
    onChange?: () => void;
    onRowSelect?: (transaction: TransactionViewModel) => void;
}

function TransactionTable(props: TransactionTableProps) {
    const tableHeadRef = useRef<HTMLTableRowElement>(null);

    const [page, setPage] = useState<PaginatedResponse<Transaction>>();
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const query: TransactionQuery = {
            ...props.query,
            pageNumber: currentPage,
        };
        TransactionService.getTransactions(query).then(setPage);
    }, [currentPage, props.query]);

    // refresh when query changes
    useEffect(() => {
        setCurrentPage(0);
    }, [props.query]);

    return (
        <>
            <Table>
                <thead>
                    <tr ref={tableHeadRef}>
                        <th style={{ width: 0 }}>
                            {page ? `(${page.totalItems})` : ""}
                        </th>
                        <th>Date</th>
                        <th>Memo</th>
                        <th>Amount</th>
                        <th>Category</th>
                    </tr>
                </thead>

                {page ? (
                    <tbody>
                        {page.results.map((t, i) => (
                            <TransactionTableRow
                                key={t.id}
                                transaction={t}
                                num={i + page.pageSize * page.currentPage}
                                onChange={props.onChange}
                                onRowSelect={props.onRowSelect}
                            />
                        ))}
                    </tbody>
                ) : (
                    ""
                )}
            </Table>
            {page ? (
                <>
                    <PaginationNav pagination={page} onNavigate={onPageNav} />
                    <Spacer height={100} />
                </>
            ) : (
                ""
            )}
        </>
    );

    function onPageNav(page: number) {
        setCurrentPage(page);
        if (tableHeadRef.current)
            tableHeadRef.current.scrollIntoView({ behavior: "smooth" });
    }
}

export default TransactionTable;

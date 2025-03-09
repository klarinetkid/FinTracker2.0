import { useEffect, useRef, useState } from "react";
import Table from "../components/Table";
import TransactionService from "../services/TransactionService";
import styles from "../styles/TransactionTable.module.css";
import PaginatedResponse from "../types/PaginatedResponse";
import Transaction from "../types/Transaction";
import TransactionQuery from "../types/TransactionQuery";
import { formatDateOnly } from "../utils/DateHelper";
import { dollarsToCents } from "../utils/NumberHelper";
import EmptyTableMessage from "./EmptyTableMessage";
import PaginationNav from "./PaginationNav";
import Spacer from "./Spacer";
import StatusIndicator from "./StatusIndicator";
import TransactionTableHeaderCell from "./TransactionTableHeaderCell";
import TransactionTableRow from "./TransactionTableRow";

interface TransactionTableProps {
    query?: TransactionQuery;
    onChange?: () => void;
    onRowSelect?: (transaction: Transaction) => void;
    refreshed?: boolean;
    showLoading?: boolean;
}

function TransactionTable(props: TransactionTableProps) {
    const { query, onChange, onRowSelect, refreshed, showLoading } = props;

    const tableHeadRef = useRef<HTMLTableRowElement>(null);
    const [page, setPage] = useState<PaginatedResponse<Transaction>>();
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [orderQuery, setOrderQuery] = useState<TransactionQuery>({
        order: query?.order,
        orderBy: query?.orderBy,
    });

    useEffect(() => {
        setIsLoading(true);

        const combinedQuery: TransactionQuery = {
            ...query,
            after: queryDate(query?.after),
            before: queryDate(query?.before),
            moreThan: dollarsToCents(query?.moreThan),
            lessThan: dollarsToCents(query?.lessThan),
            order: orderQuery.order,
            orderBy: orderQuery.orderBy,
            pageNumber: currentPage,
        };
        TransactionService.getTransactions(combinedQuery).then((result) => {
            setIsLoading(false);
            setPage(result);
        });
    }, [currentPage, query, orderQuery, refreshed]);

    // refresh when query changes
    useEffect(() => {
        setCurrentPage(0);
    }, [query, orderQuery]);

    return (
        <>
            <Table className={styles.table}>
                <thead>
                    <tr ref={tableHeadRef}>
                        <th className="nowidth">
                            {page ? `(${page.totalItems})` : ""}
                        </th>
                        <TransactionTableHeaderCell
                            order={[orderQuery, setOrderQuery]}
                            columnName="Date"
                            className={styles.colDate}
                        />
                        <TransactionTableHeaderCell
                            order={[orderQuery, setOrderQuery]}
                            columnName="Memo"
                        />
                        <TransactionTableHeaderCell
                            order={[orderQuery, setOrderQuery]}
                            columnName="Amount"
                            className={styles.colAmount}
                        />
                        <TransactionTableHeaderCell
                            order={[orderQuery, setOrderQuery]}
                            columnName="Category"
                            className={styles.colCategory}
                        />
                    </tr>
                </thead>

                {page && (
                    <tbody>
                        {page.results.map((t, i) => (
                            <TransactionTableRow
                                key={t.id}
                                transaction={t}
                                num={i + page.pageSize * page.currentPage}
                                onChange={onChange}
                                onRowSelect={onRowSelect}
                            />
                        ))}
                    </tbody>
                )}

                {page && page.totalItems === 0 && (
                    <EmptyTableMessage message="The selected filters returned 0 results." />
                )}
            </Table>
            {page && (
                <>
                    <PaginationNav pagination={page} onNavigate={onPageNav} />
                    <Spacer height={100} />
                </>
            )}

            {showLoading && isLoading && <StatusIndicator status="loading" />}
        </>
    );

    function queryDate(date: string | undefined) {
        if (date === undefined || date.trim().length === 0) return;
        return formatDateOnly(new Date(date + "T00:00:00"));
    }

    function onPageNav(page: number) {
        setCurrentPage(page);
        if (tableHeadRef.current)
            tableHeadRef.current.scrollIntoView({ behavior: "smooth" });
    }
}

export default TransactionTable;

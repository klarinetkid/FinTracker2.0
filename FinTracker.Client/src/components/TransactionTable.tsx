import { useEffect, useRef, useState } from "react";
import Table from "../components/Table";
import TransactionService from "../services/TransactionService";
import PaginatedResponse from "../types/PaginatedResponse";
import Transaction from "../types/Transaction";
import TransactionQuery from "../types/TransactionQuery";
import TransactionViewModel from "../types/TransactionViewModel";
import PaginationNav from "./PaginationNav";
import Spacer from "./Spacer";
import TransactionTableRow from "./TransactionTableRow";
import TransactionTableHeaderCell from "./TransactionTableHeaderCell";
import { useFormValues } from "../hooks/useFormValues";
import styles from "../styles/TransactionTable.module.css";
import EmptyTableMessage from "./EmptyTableMessage";
import StatusIndicator from "./StatusIndicator";

interface TransactionTableProps {
    query?: TransactionQuery;
    onChange?: () => void;
    onRowSelect?: (transaction: TransactionViewModel) => void;
    refreshed?: boolean;
    showLoading?: boolean;
}

function TransactionTable(props: TransactionTableProps) {
    const { query, onChange, onRowSelect, refreshed, showLoading } = props;

    const tableHeadRef = useRef<HTMLTableRowElement>(null);

    const [page, setPage] = useState<PaginatedResponse<Transaction>>();
    const [currentPage, setCurrentPage] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const formValues = useFormValues<TransactionQuery>(query ?? {});

    useEffect(() => {
        setIsLoading(true);

        const combinedQuery: TransactionQuery = {
            ...query,
            order: formValues.values.order ?? query?.order,
            orderBy: formValues.values.orderBy ?? query?.orderBy,
            pageNumber: currentPage,
        };
        TransactionService.getTransactions(combinedQuery).then((result) => {
            setIsLoading(false);
            setPage(result);
        });
    }, [currentPage, query, formValues.values, refreshed]);

    // refresh when query changes
    useEffect(() => {
        setCurrentPage(0);
    }, [query, formValues.values]);

    return (
        <>
            <Table className={styles.table}>
                <thead>
                    <tr ref={tableHeadRef}>
                        <th className="nowidth">
                            {page ? `(${page.totalItems})` : ""}
                        </th>
                        <TransactionTableHeaderCell
                            formValues={formValues}
                            columnName="Date"
                            className={styles.colDate}
                        />
                        <TransactionTableHeaderCell
                            formValues={formValues}
                            columnName="Memo"
                        />
                        <TransactionTableHeaderCell
                            formValues={formValues}
                            columnName="Amount"
                            className={styles.colAmount}
                        />
                        <TransactionTableHeaderCell
                            formValues={formValues}
                            columnName="Category"
                            className={styles.colCategory}
                        />
                    </tr>
                </thead>

                {page ? (
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
                ) : (
                    ""
                )}

                {page && page.totalItems === 0 ? (
                    <EmptyTableMessage message="The selected filters returns no results." />
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

            {showLoading && isLoading ? (
                <StatusIndicator status="loading" />
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

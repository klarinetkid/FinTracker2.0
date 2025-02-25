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

interface TransactionTableProps {
    query?: TransactionQuery;
    onChange?: () => void;
    onRowSelect?: (transaction: TransactionViewModel) => void;
    refresh?: boolean;
}

function TransactionTable(props: TransactionTableProps) {
    const { query, onChange, onRowSelect, refresh } = props;

    const tableHeadRef = useRef<HTMLTableRowElement>(null);

    const [page, setPage] = useState<PaginatedResponse<Transaction>>();
    const [currentPage, setCurrentPage] = useState(0);

    const formValues = useFormValues<TransactionQuery>(query ?? {});

    useEffect(() => {
        const combinedQuery: TransactionQuery = {
            ...query,
            order: formValues.values.order ?? query?.order,
            orderBy: formValues.values.orderBy ?? query?.orderBy,
            pageNumber: currentPage,
        };
        TransactionService.getTransactions(combinedQuery).then(setPage);
    }, [currentPage, query, formValues.values, refresh]);

    // refresh when query changes
    useEffect(() => {
        setCurrentPage(0);
    }, [query, formValues.values]);

    return (
        <>
            <Table className={styles.table}>
                <thead>
                    <tr ref={tableHeadRef}>
                        <th style={{ width: 0 }}>
                            {page ? `(${page.totalItems})` : ""}
                        </th>
                        <TransactionTableHeaderCell
                            formValues={formValues}
                            columnName="Date"
                            width="6em"
                        />
                        <TransactionTableHeaderCell
                            formValues={formValues}
                            columnName="Memo"
                        />
                        <TransactionTableHeaderCell
                            formValues={formValues}
                            columnName="Amount"
                            width="9em"
                        />
                        <TransactionTableHeaderCell
                            formValues={formValues}
                            columnName="Category"
                            width="13.75em"
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
        </>
    );

    function onPageNav(page: number) {
        setCurrentPage(page);
        if (tableHeadRef.current)
            tableHeadRef.current.scrollIntoView({ behavior: "smooth" });
    }
}

export default TransactionTable;

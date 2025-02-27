import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import IconButton from "../../components/IconButton";
import PaginationNav from "../../components/PaginationNav";
import PillToggle from "../../components/PillToggle";
import Row from "../../components/Row";
import Spacer from "../../components/Spacer";
import Table from "../../components/Table";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import useLocalPagination from "../../hooks/useLocalPagination";
import useTransactionImport from "../../hooks/useTransactionImport";
import styles from "../../styles/ImportTable.module.css";
import TransactionViewModel from "../../types/TransactionViewModel";
import { CategoryRefreshIcon } from "../../utils/Icons";
import ImportTableRow from "./ImportTableRow";

const importFilters = [
    "View All",
    "Selected",
    "Unselected",
    "Uncategorized",
    "Unsaved",
] as const;
type ImportFilter = (typeof importFilters)[number];

function ImportTable() {
    const transactionImport = useTransactionImport();
    const transactions = transactionImport.Transcations;

    const globalDataCache = useGlobalDataCache();
    const [filter, setFilter] = useState<ImportFilter>("View All");
    const pagination = useLocalPagination(transactionsFiltered(filter), 25);
    const location = useLocation();

    useEffect(() => pagination.setCurrentPage(0), [filter, location.state]);

    if (filter !== "View All" && transactionsFiltered(filter).length === 0) {
        setFilter("View All");
        pagination.setCurrentPage(0);
    }

    return (
        <div>
            <Row justifyContent="space-between">
                <Row gap={10}>
                    {importFilters.map((f) => (
                        <PillToggle
                            key={f}
                            title={`${f} (${transactionsFiltered(f).length})`}
                            isActive={filter === f}
                            onToggle={() => setFilter(f)}
                            disabled={transactionsFiltered(f).length === 0}
                        />
                    ))}
                </Row>
                <IconButton
                    title="Refresh categories"
                    icon={CategoryRefreshIcon}
                    onClick={() => globalDataCache.categories.refresh()}
                />
            </Row>

            <Spacer height={6} />
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th className={styles.colDate}>Date</th>
                        <th>Memo</th>
                        <th className={styles.colAmount}>Amount</th>
                        <th className={styles.colCategory}>Category</th>
                        <th className="nowidth"></th>
                    </tr>
                </thead>
                <tbody>
                    {pagination.currentItems.map((t) => (
                        <ImportTableRow
                            key={t.item.id}
                            rowNum={t.index}
                            transaction={t.item}
                        />
                    ))}
                </tbody>
            </Table>

            <PaginationNav
                pagination={pagination}
                onNavigate={pagination.setCurrentPage}
            />
        </div>
    );

    function transactionsFiltered(
        filter: ImportFilter
    ): TransactionViewModel[] {
        switch (filter) {
            case "View All":
                return transactions;
            case "Selected":
                return transactions.filter((t) => t.isSelectedForImport);
            case "Unselected":
                return transactions.filter((t) => !t.isSelectedForImport);
            case "Uncategorized":
                return transactions.filter((t) => !t.categoryId);
            case "Unsaved":
                return transactions.filter(
                    (t) =>
                        t.savedMemo === null &&
                        !t.isAlreadyImported &&
                        !t.isToSaveMemo
                );
        }
    }
}

export default ImportTable;

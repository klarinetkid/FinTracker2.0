import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ThreeDBoxIconRefresh from "../../assets/3d_box_fill_refresh.svg?react";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import IconButton from "../../components/IconButton";
import Spacer from "../../components/Spacer";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import TransactionViewModel from "../../types/models/TransactionViewModel";
import ImportTableRow from "./ImportTableRow";
import Table from "../../components/Table";
import Row from "../../components/Row";
import Select from "../../components/Select";
import useLocalPagination from "../../hooks/useLocalPagination";
import PaginationNav from "../../components/PaginationNav";

interface ImportTableProps {
    transactions: TransactionViewModel[];
}

type ImportFilter = "all" | "selected" | "uncategorized" | "unselected";

function ImportTable(props: ImportTableProps) {
    const globalDataCache = useGlobalDataCache();
    const [filter, setFilter] = useState<ImportFilter>("all");
    const pagination = useLocalPagination(transactionsFiltered(filter), 25);
    const location = useLocation();

    useEffect(() => pagination.setCurrentPage(0), [location.state]);

    useEffect(() => {
        if (filter !== "all" && transactionsFiltered(filter).length === 0) {
            setFilter("all");
            pagination.setCurrentPage(0);
        }
    }, [filter]);

    const numSelected = transactionsFiltered("selected").length;
    const numUnselected = transactionsFiltered("unselected").length;
    const numUncategorized = transactionsFiltered("uncategorized").length;

    return (
        <div>
            <Row justifyContent="space-between">
                <p>
                    There {numUncategorized === 1 ? "is" : "are"}{" "}
                    <b>{numUncategorized}</b> uncategorized transaction
                    {numUncategorized === 1 ? "" : "s"} selected for import.
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                    {/*TODO: better icon for this*/}
                    <IconButton
                        title="Refresh categories"
                        icon={ThreeDBoxIconRefresh}
                        onClick={() => globalDataCache.categories.refresh()}
                    />
                    <Select
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value as ImportFilter);
                            pagination.setCurrentPage(0);
                        }}
                    >
                        <option value="all">
                            View all ({props.transactions.length})
                        </option>
                        <option value="selected" disabled={numSelected === 0}>
                            Selected ({numSelected})
                        </option>
                        <option
                            value="unselected"
                            disabled={numUnselected === 0}
                        >
                            Unselected ({numUnselected})
                        </option>
                        <option
                            value="uncategorized"
                            disabled={numUncategorized === 0}
                        >
                            Uncategorized ({numUncategorized})
                        </option>
                    </Select>
                </div>
            </Row>
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th style={{ width: "5em" }}>Date</th>
                        <th>Memo</th>
                        <th style={{ width: "5em" }}>Amount</th>
                        <th style={{ width: "10%" }}>Category</th>
                        <th style={{ width: 0 }}></th>
                    </tr>
                </thead>
                <tbody>
                    {pagination.currentItems.map((t, i) => (
                        <ImportTableRow
                            key={i}
                            num={t.index}
                            transaction={t.item}
                        />
                    ))}
                </tbody>
            </Table>

            <PaginationNav pagination={pagination} />
        </div>
    );

    function transactionsFiltered(
        filter: ImportFilter
    ): TransactionViewModel[] {
        switch (filter) {
            case "selected":
                return props.transactions.filter((t) => t.selectedForImport);
            case "unselected":
                return props.transactions.filter((t) => !t.selectedForImport);
            case "uncategorized":
                return props.transactions.filter(
                    (t) => t.selectedForImport && !t.categoryId
                );
            default:
                return props.transactions;
        }
    }
}

export default ImportTable;

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spacer from "../../components/Spacer";
import TransactionViewModel from "../../types/models/TransactionViewModel";
import ImportTableRow from "./ImportTableRow";

interface ImportTableProps {
    transactions: TransactionViewModel[];
}

function ImportTable(props: ImportTableProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 25;

    // reset when location state changes
    const location = useLocation();
    useEffect(() => setCurrentPage(0), [location.state]);

    const [filter, setFilter] = useState<
        "all" | "selected" | "uncategorized" | "unselected"
    >("all");

    if (props.transactions.length > 0 && transactionsFiltered().length === 0) {
        setFilter("all");
        setCurrentPage(0);
    }

    const pageCount = Math.ceil(transactionsFiltered().length / pageSize);

    const numSelected = props.transactions.filter(
        (t) => t.selectedForImport
    ).length;
    const numUnselected = props.transactions.filter(
        (t) => !t.selectedForImport
    ).length;
    const numUncategorized = props.transactions.filter(
        (t) => t.selectedForImport && !t.categoryId
    ).length;

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <p>
                    There {numUncategorized === 1 ? "is" : "are"}{" "}
                    <b>{numUncategorized}</b> uncategorized transaction
                    {numUncategorized === 1 ? "" : "s"} selected for import.
                </p>
                <select
                    value={filter}
                    onChange={(e) => {
                        console.log("changled");
                        setFilter(e.target.value);
                        setCurrentPage(0);
                    }}
                >
                    <option value="all">
                        View all ({props.transactions.length})
                    </option>
                    <option value="selected" disabled={numSelected === 0}>
                        Selected ({numSelected})
                    </option>
                    <option value="unselected" disabled={numUnselected === 0}>
                        Unselected ({numUnselected})
                    </option>
                    <option
                        value="uncategorized"
                        disabled={numUncategorized === 0}
                    >
                        Uncategorized ({numUncategorized})
                    </option>
                </select>
            </div>
            <table className="table">
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
                    {transactionsFiltered()
                        .slice(
                            currentPage * pageSize,
                            (currentPage + 1) * pageSize
                        )
                        .map((t, i) => (
                            <ImportTableRow
                                key={t.id}
                                num={currentPage * pageSize + i}
                                transaction={t}
                            />
                        ))}
                </tbody>
            </table>

            <Spacer height={20} />

            {pageCount <= 1 ? (
                ""
            ) : (
                <div className="pagination-holder">
                    {[...Array(pageCount).keys()].map((p) => (
                        <button
                            className={
                                currentPage === p ? "button-fill" : "button"
                            }
                            key={p}
                            onClick={() => setCurrentPage(p)}
                        >
                            {p + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    function transactionsFiltered(): TransactionViewModel[] {
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

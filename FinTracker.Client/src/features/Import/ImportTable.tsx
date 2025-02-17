import TransactionViewModel from "../../types/models/TransactionViewModel";
import ImportTableRow from "./ImportTableRow";

interface ImportTableProps {
    transactions: TransactionViewModel[];
}

function ImportTable(props: ImportTableProps) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th></th>
                    <th style={{ width: "5em" }}>Date</th>
                    <th>Memo</th>
                    <th style={{ width: "5em" }}>Amount</th>
                    <th style={{ width: "10%" }}>Category</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.transactions.map((t, i) => (
                    <ImportTableRow key={i} num={i + 1} transaction={t} />
                ))}
            </tbody>
        </table>
    );
}

export default ImportTable;

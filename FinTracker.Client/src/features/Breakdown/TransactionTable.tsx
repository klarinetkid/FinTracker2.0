import PaginationNav from "../../components/PaginationNav";
import Table from "../../components/Table";
import useLocalPagination from "../../hooks/useLocalPagination";
import Transaction from "../../types/Transaction";
import TransactionTableRow from "./TransactionTableRow";

interface TransactionTableProps {
    transactions: Transaction[];
    onChange: () => void;
}

function TransactionTable(props: TransactionTableProps) {
    const pagination = useLocalPagination(props.transactions, 100);

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Date</th>
                        <th>Memo</th>
                        <th>Amount</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {pagination.currentItems.map((t, i) => (
                        <TransactionTableRow
                            key={i}
                            transaction={t.item}
                            num={t.index}
                            onChange={props.onChange}
                        />
                    ))}
                </tbody>
            </Table>
            <PaginationNav pagination={pagination} />
        </>
    );
}

export default TransactionTable;

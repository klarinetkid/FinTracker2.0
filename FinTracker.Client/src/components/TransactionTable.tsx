import '../styles/TransactionTable.css'
import Transaction from '../types/Transaction'
import TransactionTableRow from './TransactionTableRow'

interface TransactionTableProps {
    transactions: Transaction[],
    onChange: () => void
}

function TransactionTable(props: TransactionTableProps) {

    return (
        <div className="transaction-table-holder">
            <table className="transaction-table">
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
                    {props.transactions.map((t, i) =>
                        <TransactionTableRow key={t.id} transaction={t} rowId={i + 1} onChange={props.onChange} />
                    )}
                </tbody>
            </table>
        </div>
    )

}

export default TransactionTable
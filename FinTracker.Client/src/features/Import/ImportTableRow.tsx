import moment from "moment";
import TransactionViewModel from "../../types/models/TransactionViewModel";
import { formatCurrency } from "../../utils/NumberHelper";
import CategorySelector from "../../components/CategorySelector";

interface ImportTableRowProps {
    transaction: TransactionViewModel;
    num: number;
}

function ImportTableRow(props: ImportTableRowProps) {
    return (
        <tr
            className={`${props.transaction.isAlreadyImported ? "already-imported" : ""} ${props.transaction.defaultCategory ? "default-category" : ""}`}
        >
            <td className="bold centre">{props.num}</td>
            <td>
                <input
                    className="ralign"
                    readOnly
                    value={moment(props.transaction.date).format("yyyy-MM-DD")}
                />
            </td>
            <td>
                <input readOnly value={props.transaction.memo} />
            </td>
            <td>
                <input
                    className="ralign"
                    readOnly
                    value={formatCurrency(props.transaction.amount ?? 0)}
                />
            </td>
            <td>
                <CategorySelector value={props.transaction.defaultCategory} />
            </td>
        </tr>
    );
}

export default ImportTableRow;

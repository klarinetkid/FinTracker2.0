import "../styles/InOutPills.css";
import { formatCurrency } from "../utils/NumberHelper";

interface InOutPillsProps {
    totalIn: number;
    totalOut: number;
}

function InOutPills(props: InOutPillsProps) {
    return (
        <div className="dashboard-month-inout">
            <div className="dashboard-month-in month-inout-pill">
                In: {formatCurrency(props.totalIn)}
            </div>
            <div className="dashboard-month-out month-inout-pill">
                Out: {formatCurrency(props.totalOut, true)}
            </div>
            <div className="dashboard-month-net month-inout-pill">
                Net: {formatCurrency(props.totalIn + props.totalOut)}
            </div>
        </div>
    );
}

export default InOutPills;

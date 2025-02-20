import style from "../styles/InOutPills.module.css";
import { formatCurrency } from "../utils/NumberHelper";

interface InOutPillsProps {
    totalIn: number;
    totalOut: number;
    showLabels?: boolean;
}

function InOutPills(props: InOutPillsProps) {
    return (
        <div className={style.holder}>
            <div className={style.in}>
                {props.showLabels === false ? "" : "In:"} {formatCurrency(props.totalIn)}
            </div>
            <div className={style.out}>
                {props.showLabels === false ? "" : "Out:"}{" "}
                {formatCurrency(props.totalOut, true)}
            </div>
            <div className={style.net}>
                {props.showLabels === false ? "" : "Net:"}{" "}
                {formatCurrency(props.totalIn + props.totalOut)}
            </div>
        </div>
    );
}

export default InOutPills;

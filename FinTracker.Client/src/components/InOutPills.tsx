import styles from "../styles/InOutPills.module.css";
import { formatCurrency } from "../utils/NumberHelper";

interface InOutPillsProps {
    totalIn: number;
    totalOut: number;
    showLabels?: boolean;
}

function InOutPills(props: InOutPillsProps) {
    return (
        <div className={styles.holder}>
            <div className={styles.in}>
                {props.showLabels === false ? "" : "In:"}{" "}
                {formatCurrency(props.totalIn)}
            </div>
            <div className={styles.out}>
                {props.showLabels === false ? "" : "Out:"}{" "}
                {formatCurrency(props.totalOut, true)}
            </div>
            <div className={styles.net}>
                {props.showLabels === false ? "" : "Net:"}{" "}
                {formatCurrency(props.totalIn + props.totalOut)}
            </div>
        </div>
    );
}

export default InOutPills;

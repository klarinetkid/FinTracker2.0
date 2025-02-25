import styles from "../styles/InOutPills.module.css";
import { formatCurrency } from "../utils/NumberHelper";

interface InOutPillsProps {
    totalIn: number;
    totalOut: number;
    showLabels?: boolean;
}

function InOutPills(props: InOutPillsProps) {
    const { totalIn, totalOut, showLabels } = props;
    const labels = showLabels === false;

    return (
        <div className={styles.holder}>
            <div className={styles.in}>
                {labels ? "" : "In:"} {formatCurrency(totalIn, false, true)}
            </div>
            <div className={styles.out}>
                {labels ? "" : "Out:"} {formatCurrency(totalOut, true, true)}
            </div>
            <div className={styles.net}>
                {labels ? "" : "Net:"} {formatCurrency(totalIn + totalOut, false, true)}
            </div>
        </div>
    );
}

export default InOutPills;

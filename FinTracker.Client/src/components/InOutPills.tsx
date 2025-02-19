import style from "../styles/InOutPills.module.css";
import { formatCurrency } from "../utils/NumberHelper";

interface InOutPillsProps {
    totalIn: number;
    totalOut: number;
}

function InOutPills(props: InOutPillsProps) {
    return (
        <div className={style.holder}>
            <div className={style.in}>In: {formatCurrency(props.totalIn)}</div>
            <div className={style.out}>
                Out: {formatCurrency(props.totalOut, true)}
            </div>
            <div className={style.net}>
                Net: {formatCurrency(props.totalIn + props.totalOut)}
            </div>
        </div>
    );
}

export default InOutPills;

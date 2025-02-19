import moment from "moment";
import { useNavigate } from "react-router-dom";
import InOutPills from "../../components/InOutPills";
import Breakdown from "../../types/Breakdown";
import { toBreakdown } from "../../utils/BreakdownHelper";
import { addToColour } from "../../utils/ColourHelper";
import { formatCurrency, toFixed } from "../../utils/NumberHelper";
import style from "../../styles/MonthSummaryCard.module.css";

interface DashboardMonthSummaryProps {
    breakdown: Breakdown;
}

function MonthSummaryCard(props: DashboardMonthSummaryProps) {
    const navigate = useNavigate();

    // filtered and sorted
    const categoryBands = props.breakdown.categoryTotals
        .filter((c) => c.category && c.total < 0)
        .sort((a, b) => a.total - b.total);

    return (
        <div className={style.row} onClick={openBreakdown}>
            <div className={style.header}>
                <h4>{moment(props.breakdown.start).format("MMMM")}</h4>

                <InOutPills
                    totalIn={props.breakdown.totalIn}
                    totalOut={props.breakdown.totalOut}
                />
            </div>

            <div className={style.bandHolder}>
                {categoryBands.map((categoryTotal) =>
                    categoryTotal.category && categoryTotal.percentOfIncome ? (
                        <div
                            key={categoryTotal.category.id}
                            className={style.band}
                            style={{
                                width:
                                    Math.abs(categoryTotal.percentOfIncome) +
                                    "%",
                                background: `linear-gradient(#${categoryTotal.category.colour}, #${addToColour(categoryTotal.category.colour, 0x60)})`,
                            }}
                        >
                            <div className={style.tooltip}>
                                {categoryTotal.category.categoryName}:{" "}
                                {formatCurrency(categoryTotal.total, true)} (
                                {toFixed(
                                    Math.abs(categoryTotal.percentOfIncome),
                                    1
                                )}
                                %)
                            </div>
                        </div>
                    ) : (
                        ""
                    )
                )}
            </div>
        </div>
    );

    function openBreakdown() {
        navigate(toBreakdown(props.breakdown.start, props.breakdown.end));
    }
}

export default MonthSummaryCard;

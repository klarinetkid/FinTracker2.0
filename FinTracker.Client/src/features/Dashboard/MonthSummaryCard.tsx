import moment from "moment";
import { useNavigate } from "react-router-dom";
import tinycolor from "tinycolor2";
import InOutPills from "../../components/InOutPills";
import style from "../../styles/MonthSummaryCard.module.css";
import Breakdown from "../../types/Breakdown";
import Category from "../../types/Category";
import { toBreakdown } from "../../utils/BreakdownHelper";
import { formatCurrency, toFixed } from "../../utils/NumberHelper";
import { addToColour } from "../../utils/ColourHelper";

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
                                background: categoryTotal.category
                                    ? getBandGradient(categoryTotal.category)
                                    : "grey",
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

    function getBandGradient(category: Category): string {
        const colour = tinycolor(category.colour);

        if (!colour.isValid()) return "grey";

        const spread = 30;
        const darkened = colour.clone().darken(spread);
        const lightened = colour.clone().lighten(spread);
        return `linear-gradient(to bottom, ${darkened.toRgbString()}, ${colour.toRgbString()}, ${colour.toRgbString()}, ${lightened.toRgbString()})`;
    }
}

export default MonthSummaryCard;

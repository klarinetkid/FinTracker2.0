import moment from "moment";
import { useNavigate } from "react-router-dom";
import tinycolor from "tinycolor2";
import InOutPills from "../../components/InOutPills";
import styles from "../../styles/BreakdownTable.module.css";
import Breakdown from "../../types/Breakdown";
import { Uncategorized } from "../../types/Category";
import CategoryTotal from "../../types/CategoryTotal";
import { getTotalIncome, toBreakdown } from "../../utils/BreakdownHelper";
import { formatCurrency, toFixed } from "../../utils/NumberHelper";

interface BreakdownTableProps {
    breakowns: Breakdown[];
    dateFormat: string;
    bandValueProperty:
        | "percentOfIncome"
        | "percentOfSpend"
        | "percentOfYearlySpend";
}

function BreakdownTable(props: BreakdownTableProps) {
    const navigate = useNavigate();

    const breakdowns = props.breakowns.filter(
        (b) => b.categoryTotals.length > 0
    );

    const yearlyIncome = getTotalIncome(breakdowns);

    return (
        <table className={styles.table}>
            <tbody>
                {breakdowns.map((breakdown, i) => (
                    <tr key={i} onClick={() => openBreakdown(breakdown)}>
                        <td className="ralign">
                            <h4>
                                {moment(breakdown.start).format(
                                    props.dateFormat
                                )}
                            </h4>
                        </td>
                        <td className={styles.bandHolderCell}>
                            <div className={styles.bandHolder}>
                                {spendingTotalsSorted(breakdown).map(
                                    (categoryTotal, i) => (
                                        <div
                                            key={i}
                                            className={styles.band}
                                            style={getBandStyle(categoryTotal)}
                                        >
                                            <div className={styles.tooltip}>
                                                {getTooltipText(categoryTotal)}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </td>
                        <td>
                            <InOutPills
                                totalIn={breakdown.totalIn}
                                totalOut={breakdown.totalOut}
                                showLabels={false}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    function spendingTotalsSorted(breakdown: Breakdown) {
        return breakdown.categoryTotals
            .filter(
                (c) => c.category && c.total < 0 && getCategoryPercentage(c)
            )
            .sort((a, b) => a.total - b.total);
    }

    function getBandStyle(categoryTotal: CategoryTotal) {
        const colour = categoryTotal.category?.colour ?? "grey";
        return {
            width: Math.abs(getCategoryPercentage(categoryTotal) ?? 0) + "%",
            background: getBandGradient(colour),
        };
    }

    function getBandGradient(colour: string): string {
        const c = tinycolor(colour);
        const validColour = c.isValid() ? c : tinycolor("grey");
        const spread = 30;
        const darkened = validColour.clone().darken(spread);
        const lightened = validColour.clone().lighten(spread);
        return `linear-gradient(to bottom, ${darkened.toRgbString()}, 
            ${validColour.toRgbString()}, ${validColour.toRgbString()}, ${lightened.toRgbString()})`;
    }

    function getTooltipText(categoryTotal: CategoryTotal) {
        const categoryName =
            categoryTotal.category?.categoryName ?? Uncategorized.categoryName;
        const total = formatCurrency(categoryTotal.total, true);
        const pct = toFixed(
            Math.abs(getCategoryPercentage(categoryTotal) ?? 0),
            1
        );
        //return `${categoryName}: ${total} (${pct}%)`;
        return (
            <>
                {categoryName}
                <br />
                {total} ({pct}%)
            </>
        );
    }

    function getCategoryPercentage(
        categoryTotal: CategoryTotal
    ): number | undefined {
        switch (props.bandValueProperty) {
            case "percentOfIncome":
                return categoryTotal.percentOfIncome;
            case "percentOfSpend":
                return categoryTotal.percentOfSpend;
            case "percentOfYearlySpend":
                return (
                    ((categoryTotal.total * breakdowns.length) /
                        (yearlyIncome || 1)) *
                    100
                );
        }
    }

    function openBreakdown(breakdown: Breakdown) {
        navigate(toBreakdown(breakdown.start, breakdown.end));
    }
}

export default BreakdownTable;

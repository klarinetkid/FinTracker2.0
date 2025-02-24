import moment from "moment";
import { useNavigate } from "react-router-dom";
import tinycolor from "tinycolor2";
import InOutPills from "../../components/InOutPills";
import styles from "../../styles/BreakdownTable.module.css";
import Breakdown from "../../types/Breakdown";
import { Uncategorized } from "../../types/Category";
import CategoryTotal from "../../types/CategoryTotal";
import {
    getIncomeCategoriesTotal,
    getSpendingCategories,
    toBreakdown,
} from "../../utils/BreakdownHelper";
import { formatCurrency } from "../../utils/NumberHelper";

interface BreakdownTableProps {
    breakdowns: Breakdown[];
    titleFormat: string;
    bandValueProperty:
        | "percentOfIncome"
        | "percentOfSpend"
        | "percentOfYearlySpend";
}

function BreakdownTable(props: BreakdownTableProps) {
    const { breakdowns, titleFormat, bandValueProperty } = props;

    const navigate = useNavigate();

    const breakdownsFiltered = breakdowns.filter(
        (b) => b.categoryTotals.length > 0
    );

    const yearlyIncome = getIncomeCategoriesTotal(breakdowns);

    return (
        <table className={styles.table}>
            <tbody>
                {breakdownsFiltered.map((breakdown, i) => (
                    <tr key={i} onClick={() => openBreakdown(breakdown)}>
                        <td className="ralign">
                            <h4>
                                {moment(breakdown.start).format(titleFormat)}
                            </h4>
                        </td>
                        <td className={styles.bandHolderCell}>
                            <div className={styles.bandHolder}>
                                {spendingTotalWithPctProp(breakdown).map(
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
                        <td className={styles.inOutCell}>
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

    // get spending categories sorted that have a value for
    // the property we are using for percentage
    function spendingTotalWithPctProp(breakdown: Breakdown) {
        return getSpendingCategories(breakdown.categoryTotals).filter(
            getCategoryPercentage
        );
    }

    function getBandStyle(categoryTotal: CategoryTotal) {
        const colour = categoryTotal.category?.colour ?? Uncategorized.colour;
        return {
            width: Math.abs(getCategoryPercentage(categoryTotal) ?? 0) + "%",
            background: getBandGradient(colour),
        };
    }

    function getBandGradient(colour: string): string {
        const c = tinycolor(colour);
        const validColour = c.isValid() ? c : tinycolor(Uncategorized.colour);
        const spread = 30;
        const darkened = validColour.clone().darken(spread);
        const lightened = validColour.clone().lighten(spread);
        return `linear-gradient(to bottom, ${darkened.toRgbString()}, 
            ${validColour.toRgbString()}, ${validColour.toRgbString()}, ${lightened.toRgbString()})`;
    }

    function getTooltipText(categoryTotal: CategoryTotal) {
        const categoryName =
            categoryTotal.category?.categoryName ?? Uncategorized.categoryName;
        const total = formatCurrency(categoryTotal.total);
        const pct = Math.abs(getCategoryPercentage(categoryTotal) ?? 0).toFixed(
            1
        );

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
        switch (bandValueProperty) {
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

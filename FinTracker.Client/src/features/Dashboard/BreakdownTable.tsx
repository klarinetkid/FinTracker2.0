import moment from "moment";
import style from "../../styles/BreakdownTable.module.css";
import Breakdown from "../../types/Breakdown";
import { formatCurrency, toFixed } from "../../utils/NumberHelper";
import Category from "../../types/Category";
import tinycolor from "tinycolor2";
import InOutPills from "../../components/InOutPills";
import { toBreakdown } from "../../utils/BreakdownHelper";
import { useNavigate } from "react-router-dom";

interface BreakdownTableProps {
    breakowns: Breakdown[];
}

function BreakdownTable(props: BreakdownTableProps) {
    const navigate = useNavigate();

    const breakdowns = props.breakowns.filter(
        (b) => b.categoryTotals.length > 0
    );

    return (
        <table className={style.table}>
        <tbody>
            {breakdowns.map((breakdown, i) => (
                <tr key={i} onClick={() => openBreakdown(breakdown)}>
                    <td className="ralign" width="100px">
                        <h4>{moment(breakdown.start).format("MMMM")}</h4>
                    </td>
                    <td style={{ width: "80%" }}>
                        <div className={style.bandHolder}>
                            {getCategoryTotals(breakdown).map(
                                (categoryTotal) => (
                                    <div
                                        key={categoryTotal.category.id}
                                        className={style.band}
                                        style={{
                                            width:
                                                Math.abs(
                                                    categoryTotal.percentOfIncome
                                                ) + "%",
                                            background: categoryTotal.category
                                                ? getBandGradient(
                                                      categoryTotal.category
                                                  )
                                                : "grey",
                                        }}
                                    >
                                        <div className={style.tooltip}>
                                            {
                                                categoryTotal.category
                                                    .categoryName
                                            }
                                            :{" "}
                                            {formatCurrency(
                                                categoryTotal.total,
                                                true
                                            )}{" "}
                                            (
                                            {toFixed(
                                                Math.abs(
                                                    categoryTotal.percentOfIncome
                                                ),
                                                1
                                            )}
                                            %)
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

    function getCategoryTotals(breakdown: Breakdown) {
        return breakdown.categoryTotals
            .filter((c) => c.category && c.total < 0 && c.percentOfIncome)
            .sort((a, b) => a.total - b.total);
    }

    function getBandGradient(category: Category): string {
        const colour = tinycolor(category.colour);

        if (!colour.isValid()) return "grey";

        const spread = 30;
        const darkened = colour.clone().darken(spread);
        const lightened = colour.clone().lighten(spread);
        return `linear-gradient(to bottom, ${darkened.toRgbString()}, ${colour.toRgbString()}, ${colour.toRgbString()}, ${lightened.toRgbString()})`;
    }

    function openBreakdown(breakdown: Breakdown) {
        navigate(toBreakdown(breakdown.start, breakdown.end));
    }
}

export default BreakdownTable;

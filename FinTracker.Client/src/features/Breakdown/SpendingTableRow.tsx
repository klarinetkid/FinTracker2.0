import tinycolor from "tinycolor2";
import CategoryPill from "../../components/CategoryPill";
import Checkbox from "../../components/Checkbox";
import useCategorySelection from "../../hooks/useCategorySelection";
import styles from "../../styles/SpendingTableRow.module.css";
import { Uncategorized } from "../../types/Category";
import CategoryTotal from "../../types/CategoryTotal";
import { classList } from "../../utils/HtmlHelper";
import { formatCurrency } from "../../utils/NumberHelper";
import Tooltip from "../../components/Tooltip";

interface BreakdownTableRowProps {
    categoryTotal: CategoryTotal;
    noSelect?: boolean;
    maxCategorySpend: number;
    visible?: boolean;
}

function SpendingTableRow(props: BreakdownTableRowProps) {
    const { categoryTotal, noSelect, maxCategorySpend, visible } = props;

    const categorySelection = useCategorySelection();

    const category = categoryTotal.category ?? Uncategorized;
    const isSelected = categorySelection.isSelected(category);
    const colour = tinycolor(category.colour).toRgbString();

    const total = formatCurrency(categoryTotal.total);

    const percentOfIncome = categoryTotal.percentOfIncome
        ? categoryTotal.percentOfIncome < -1000
            ? "< -1,000%"
            : categoryTotal.percentOfIncome.toFixed(1) + "%"
        : "";

    const percentOfSpend = categoryTotal.percentOfSpend
        ? categoryTotal.percentOfSpend.toFixed(1) + "%"
        : "";

    const budget = formatCurrency(categoryTotal.budget);

    return (
        <tbody
            className={classList(
                styles.spendingRowGroup,
                visible === false ? styles.hidden : "",
                isSelected ? styles.selected : ""
            )}
        >
            <tr>
                <td rowSpan={2}>
                    {!noSelect && (
                        <Checkbox
                            checked={isSelected}
                            onChange={() =>
                                categorySelection.toggleCategory(category)
                            }
                        />
                    )}
                </td>
                <td colSpan={1}>
                    <div
                        className={styles.valueBarStart}
                        style={{
                            backgroundColor: colour,
                            border: categoryTotal.category
                                ? ""
                                : "solid black 1px",
                        }}
                    ></div>
                </td>
                <td colSpan={5}>
                    <div
                        className={styles.valueBar}
                        style={{
                            backgroundColor: colour,
                            border: categoryTotal.category
                                ? ""
                                : "solid black 1px",
                            maxWidth:
                                (categoryTotal.total / maxCategorySpend) * 100 +
                                "%",
                        }}
                    ></div>
                </td>
            </tr>
            <tr className={styles.dataRow}>
                <td>
                    <CategoryPill
                        category={categoryTotal.category}
                        openTop={true}
                    />
                </td>
                <td>{total}</td>
                <td>{percentOfIncome}</td>
                <td>{percentOfSpend}</td>
                <td>{budget}</td>
                <td>{getBudgetDeviationCell()}</td>
            </tr>
        </tbody>
    );

    function getBudgetDeviationCell() {
        if (!categoryTotal.budget || !categoryTotal.budgetDeviation) return;

        const className = classList(
            styles.budgetDeviation,
            categoryTotal.budgetDeviation > 0
                ? styles.budgetOver
                : styles.budgetUnder
        );

        const modifier = categoryTotal.budgetDeviation > 0 ? "+" : "-";

        const tooltip =
            (categoryTotal.budgetDeviation > 0 ? "Over by " : "Under by ") +
            formatCurrency(categoryTotal.budgetDeviation, true, true);

        const deviationPct =
            (categoryTotal.budgetDeviation / categoryTotal.budget) * 100;

        return (
            <span className={className}>
                {modifier}
                {Math.abs(deviationPct).toFixed(1)}%<Tooltip>{tooltip}</Tooltip>
            </span>
        );
    }
}

export default SpendingTableRow;

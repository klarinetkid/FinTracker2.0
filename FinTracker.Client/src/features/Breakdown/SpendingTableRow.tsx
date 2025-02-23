import tinycolor from "tinycolor2";
import CategoryPill from "../../components/CategoryPill";
import Checkbox from "../../components/Checkbox";
import useCategorySelection from "../../hooks/useCategorySelection";
import styles from "../../styles/SpendingTableRow.module.css";
import { Uncategorized } from "../../types/Category";
import CategoryTotal from "../../types/CategoryTotal";
import { classList } from "../../utils/HtmlHelper";
import { formatCurrency, toFixed } from "../../utils/NumberHelper";

interface BreakdownTableRowProps {
    categoryTotal: CategoryTotal;
    noSelect?: boolean;
    maxCategorySpend: number;
    visible?: boolean;
}

function SpendingTableRow(props: BreakdownTableRowProps) {
    const categorySelection = useCategorySelection();

    const category = props.categoryTotal.category ?? Uncategorized;
    const isSelected = categorySelection.isSelected(category);
    const colour = tinycolor(category.colour).toRgbString();

    const total = formatCurrency(props.categoryTotal.total);
    const percentOfIncome = props.categoryTotal.percentOfIncome
        ? props.categoryTotal.percentOfIncome < -1000
            ? "< -1,000%"
            : toFixed(props.categoryTotal.percentOfIncome, 1).toLocaleString() +
              "%"
        : "";
    const percentOfSpend = props.categoryTotal.percentOfSpend
        ? toFixed(props.categoryTotal.percentOfSpend, 1) + "%"
        : "";
    const budget = props.categoryTotal.budget
        ? formatCurrency(props.categoryTotal.budget)
        : "";

    return (
        <tbody
            className={classList(
                styles.spendingRowGroup,
                props.visible === false ? styles.hidden : "",
                isSelected ? styles.selected : ""
            )}
        >
            <tr>
                <td rowSpan={2}>
                    {!props.noSelect ? (
                        <Checkbox
                            checked={isSelected}
                            onChange={() =>
                                categorySelection.toggleCategory(category)
                            }
                        />
                    ) : (
                        ""
                    )}
                </td>
                <td colSpan={1}>
                    <div
                        className={styles.valueBarStart}
                        style={{
                            backgroundColor: colour,
                            border: props.categoryTotal.category
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
                            border: props.categoryTotal.category
                                ? ""
                                : "solid black 1px",
                            maxWidth:
                                (props.categoryTotal.total /
                                    props.maxCategorySpend) *
                                    100 +
                                "%",
                        }}
                    ></div>
                </td>
            </tr>
            <tr className={styles.dataRow}>
                <td className="lalign">
                    <CategoryPill
                        category={props.categoryTotal.category}
                        openTop={true}
                    />
                </td>
                <td className="ralign">{total}</td>
                <td className="ralign">{percentOfIncome}</td>
                <td className="ralign">{percentOfSpend}</td>
                <td className="ralign">{budget}</td>
                <td className="ralign">
                    {props.categoryTotal.budget &&
                    props.categoryTotal.budgetDeviation ? (
                        <span
                            className={
                                props.categoryTotal.budgetDeviation > 0
                                    ? styles.budgetOver
                                    : styles.budgetUnder
                            }
                            title={formatCurrency(
                                props.categoryTotal.budgetDeviation * -1
                            )}
                        >
                            {(props.categoryTotal.budgetDeviation > 0
                                ? "+"
                                : "-") +
                                toFixed(
                                    Math.abs(
                                        (props.categoryTotal.budgetDeviation /
                                            props.categoryTotal.budget) *
                                            100
                                    ),
                                    1
                                )}
                            %
                        </span>
                    ) : (
                        ""
                    )}
                </td>
            </tr>
        </tbody>
    );
}

export default SpendingTableRow;

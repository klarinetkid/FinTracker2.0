import CategoryPill from "../../components/CategoryPill";
import Checkbox from "../../components/Checkbox";
import useCategorySelection from "../../hooks/useCategorySelection";
import style from "../../styles/SpendingTableRow.module.css";
import { Uncategorized } from "../../types/Category";
import CategoryTotal from "../../types/CategoryTotal";
import { classList } from "../../utils/htmlHelper";
import { formatCurrency, toFixed } from "../../utils/NumberHelper";

interface BreakdownTableRowProps {
    categoryTotal: CategoryTotal;
    noSelect?: boolean;
    maxCategorySpend: number;
    visible?: boolean;
}

function SpendingTableRow(props: BreakdownTableRowProps) {
    const category = props.categoryTotal.category ?? Uncategorized;

    const categorySelection = useCategorySelection();
    const isSelected = categorySelection.isSelected(category);

    return (
        <tbody
            className={classList(
                style.spendingRowGroup,
                isSelected ? style.selected : ""
            )}
            style={{ opacity: props.visible === false ? 0 : 100 }}
        >
            <tr>
                <td rowSpan={2}>
                    {!props.noSelect ? (
                        // TODO figure out if this is a good way to get it to rerender with key property
                        <Checkbox
                            key={isSelected.toString()}
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
                        className={style.valueBarStart}
                        style={{
                            backgroundColor: "#" + category.colour,
                            border: props.categoryTotal.category
                                ? ""
                                : "solid black 1px",
                            width: "100%",
                        }}
                    ></div>
                </td>
                <td colSpan={5}>
                    <div
                        className={style.valueBar}
                        style={{
                            backgroundColor: "#" + category.colour,
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
            <tr className={style.dataRow}>
                <td className="lalign">
                    <CategoryPill
                        category={props.categoryTotal.category}
                        style={{
                            borderStartEndRadius: 0,
                            borderStartStartRadius: 0,
                            borderTop: "none",
                        }}
                    />
                </td>
                <td className="ralign">
                    {formatCurrency(props.categoryTotal.total)}
                </td>
                <td className="ralign">
                    {props.categoryTotal.percentOfIncome
                        ? toFixed(props.categoryTotal.percentOfIncome, 1) + "%"
                        : ""}
                </td>
                <td className="ralign">
                    {props.categoryTotal.percentOfSpend
                        ? toFixed(props.categoryTotal.percentOfSpend, 1) + "%"
                        : ""}
                </td>
                <td className="ralign">
                    {props.categoryTotal.budget
                        ? formatCurrency(props.categoryTotal.budget)
                        : ""}
                </td>
                <td className="ralign">
                    {props.categoryTotal.budget &&
                    props.categoryTotal.budgetDeviation ? (
                        <span
                            className={
                                props.categoryTotal.budgetDeviation > 0
                                    ? style.budgetOver
                                    : style.budgetUnder
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

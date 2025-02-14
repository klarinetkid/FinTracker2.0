import { useEffect, useState } from "react";
import BudgetItem from "../types/BudgetItem";
import CategoryTotal from "../types/CategoryTotal";
import CategoryPill from "./CategoryPill";
import Checkbox from "./Checkbox";
import { formatCurrency, toFixed } from "../utils/NumberHelper";
import useCategorySelection from "../hooks/useCategorySelection";
import { Uncategorized } from "../types/Category";

interface BreakdownTableRowProps {
    categoryTotal: CategoryTotal,
    budget?: BudgetItem,
    budgetFactor?: number,
    totalSpend: number,
    noSelect?: boolean,
    spendingCategories: CategoryTotal[],
}

function SpendingTableRow(props: BreakdownTableRowProps) {

    // TODO: clean this up
    const monthlyBudgetAmount = !props.budget ? 0 : Math.floor(props.budget.amount * (props.budgetFactor ?? 1)) 
    const diff = monthlyBudgetAmount + props.categoryTotal.total
    const deviation = diff / monthlyBudgetAmount * 100;


    const category = props.categoryTotal.category ?? Uncategorized
    const categorySelection = useCategorySelection()
    const [isSelected, setIsSelected] = useState(categorySelection.isSelected(category))

    useEffect(() => {
        setIsSelected(categorySelection.isSelected(category))
    }, [categorySelection, category])

    return (
        <tbody className={isSelected ? "selected" : ""} >
            <tr className={`breakdown-cat-bar-row ${isSelected ? "selected" : ""}`}>
                <td rowSpan={2}>
                    {props.noSelect ? "" :
                        // TODO figure out if this is a good way to get it to rerender with key property
                        <Checkbox key={isSelected.toString()} checked={isSelected} onChange={() => categorySelection.toggleCategory(category)} />
                    }
                </td>
                <td colSpan={1}>
                    <div
                        className="breakdown-cat-bar-start"
                        style={{
                            backgroundColor: "#" + category.colour,
                            border: props.categoryTotal.category ? "" : "solid black 1px",
                            width: "100%"
                        }}></div>
                </td>
                <td colSpan={5}>
                    <div
                        className="breakdown-cat-bar"
                        style={{
                            backgroundColor: "#" + category.colour,
                            border: props.categoryTotal.category ? "" : "solid black 1px",
                            maxWidth: (props.categoryTotal.total / props.spendingCategories[0].total * 100) + "%"
                        }}></div>
                </td>
            </tr>
            <tr className={`breakdown-cat-value-row ${isSelected ? "selected" : ""}`}>

                <td className="lalign">
                    <CategoryPill category={props.categoryTotal.category} />
                </td>
                <td className="ralign">{formatCurrency(props.categoryTotal.total)}</td>
                <td className="ralign">{toFixed(props.categoryTotal.percentOfIncome, 1)}%</td>
                <td className="ralign">{toFixed(props.categoryTotal.total / props.totalSpend * 100, 1)}%</td>
                <td className="ralign">
                    {!props.budget ? "" :
                        formatCurrency(props.budget.isYearly ? props.budget.amount : monthlyBudgetAmount)
                    }
                </td>
                <td className="ralign">
                    {!props.budget ? "" :
                        props.budget.isYearly ?

                            <span className="budget-dev-yearly">
                                {toFixed(Math.abs(props.categoryTotal.total / props.budget.amount * 100), 1)}%
                            </span>
                            :
                            <span className={diff < 0 ? "budget-dev-over" : "budget-dev-under"} title={formatCurrency(diff * -1)}>
                                {(deviation < 0 ? "+" : "-") + toFixed(Math.abs(deviation), 1)}%
                            </span>
                    }
                </td>
            </tr>
            <tr className={`breakdown-cat-spacer-row ${isSelected ? "selected" : ""}`}>
                <td colSpan={ 7}></td>
            </tr>
        </tbody>
        
    )
}

export default SpendingTableRow;
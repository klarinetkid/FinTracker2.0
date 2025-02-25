import { Moment } from "moment";
import { createSearchParams } from "react-router-dom";
import Breakdown from "../types/Breakdown";
import CategoryTotal from "../types/CategoryTotal";
import Pages from "../types/Pages";
import { sum } from "./ArrayHelper";
import { formatDateOnly } from "./DateHelper";

export function getTotalIn(summaries: Breakdown[] | undefined): number {
    if (!summaries) return 0;
    return sum(summaries.map((s) => s.totalIn));
}

export function getTotalOut(summaries: Breakdown[] | undefined): number {
    if (!summaries) return 0;
    return sum(summaries.map((s) => s.totalOut));
}

export function breakdownParamsAreValid(start: Moment, end: Moment) {
    return start.isValid() && end.isValid() && end.isAfter(start);
}

export function toBreakdown(start: Moment | string, end: Moment | string) {
    return {
        pathname: Pages.Breakdown,
        search: createSearchParams({
            start: formatDateOnly(start),
            end: formatDateOnly(end),
        }).toString(),
    };
}

export function getIncomeCategoriesTotal(breakdowns: Breakdown[]): number {
    return sum(
        breakdowns
            .map((b) =>
                getIncomeCategories(b.categoryTotals).map((c) => c.total)
            )
            .flat()
    );
}

export function getSpendingCategories(
    categoryTotals: CategoryTotal[] | undefined
) {
    if (!categoryTotals) return [];
    return categoryTotals
        .filter((c) => c.total < 0)
        .sort((a, b) => a.total - b.total);
}

export function getIncomeCategories(
    categoryTotals: CategoryTotal[] | undefined
) {
    if (!categoryTotals) return [];
    return categoryTotals
        .filter((c) => c.total > 0)
        .sort((a, b) => a.total - b.total);
}

export function breakdownsContainAnyData(breakdowns: Breakdown[]): boolean {
    return breakdowns.filter((b) => b.categoryTotals.length > 0).length > 0;
}

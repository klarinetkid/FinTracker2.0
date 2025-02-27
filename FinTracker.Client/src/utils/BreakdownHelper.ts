import moment, { Moment } from "moment";
import { createSearchParams } from "react-router-dom";
import CategoryTotal from "../types/CategoryTotal";
import Pages from "../types/Pages";
import { formatDateOnly } from "./DateHelper";

export function breakdownParamsAreValid(
    start: Moment | string,
    end: Moment | string
) {
    const from = moment(start);
    const to = moment(end);
    return from.isValid() && to.isValid() && to.isAfter(from);
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
        .sort((b, a) => a.total - b.total);
}

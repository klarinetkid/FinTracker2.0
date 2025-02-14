import moment, { Moment } from "moment";
import Breakdown from "../types/Breakdown";

// this function returns the factor to multiply a monthly
// budget amount for the given breakdown range
export function getBreakdownBudgetMonthFactor(breakdown: Breakdown): number {
    const budgetEnd = moment(new Date()).isBefore(moment(breakdown.end)) ? new Date() : breakdown.end
    const effectiveBudgetDays = moment(budgetEnd).diff(breakdown.start, "days")
    return 12.0 * effectiveBudgetDays / 365.0; // TODO: leap year?
}

export function getTotalSpend(breakdown: Breakdown): number {
    const spendingCategories = breakdown.categoryTotals.filter(c => c.total < 0)

    if (spendingCategories.length === 0) return 0

    return Math.abs(spendingCategories.map(c => c.total).reduce((sum, i) => sum + i))
}

export function getTotalIn(summaries: Breakdown[] | undefined): number {
    return !summaries || summaries.length === 0 ? 0 :
        summaries.map(s => s.totalIn).reduce((sum, i) => sum + i)
}

export function getTotalOut(summaries: Breakdown[] | undefined): number {
    return !summaries || summaries.length === 0 ? 0 :
        summaries.map(s => s.totalOut).reduce((sum, i) => sum + i)
}

export function breakdownParamsAreValid(start: Moment, end: Moment) {
    return start.isValid() && end.isValid() && end.isAfter(start)
}
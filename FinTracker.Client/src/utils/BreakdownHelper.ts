import moment, { Moment } from "moment";
import { createSearchParams } from "react-router-dom";
import Breakdown from "../types/Breakdown";
import Pages from "../types/Pages";
import { sum } from "./ArrayHelper";

export function getTotalIn(summaries: Breakdown[] | undefined): number {
    return !summaries || summaries.length === 0
        ? 0
        : summaries.map((s) => s.totalIn).reduce((sum, i) => sum + i);
}

export function getTotalOut(summaries: Breakdown[] | undefined): number {
    return !summaries || summaries.length === 0
        ? 0
        : summaries.map((s) => s.totalOut).reduce((sum, i) => sum + i);
}

export function breakdownParamsAreValid(start: Moment, end: Moment) {
    return start.isValid() && end.isValid() && end.isAfter(start);
}

export function toBreakdown(start: Moment | string, end: Moment | string) {
    return {
        pathname: Pages.Breakdown,
        search: createSearchParams({
            start: moment(start).format("yyyy-MM-DD"),
            end: moment(end).format("yyyy-MM-DD"),
        }).toString(),
    };
}

export function getTotalIncome(breakdowns: Breakdown[]): number {
    return sum(
        breakdowns
            .map((b) => b.categoryTotals)
            .flat()
            .filter((c) => c.total > 0)
            .map((c) => c.total)
    );
}

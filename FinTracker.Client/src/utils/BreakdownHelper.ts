import moment, { Moment } from "moment";
import { createSearchParams } from "react-router-dom";
import Breakdown from "../types/Breakdown";
import Pages from "../types/Pages";

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

export function toBreakdown(start: Moment | Date, end: Moment | Date) {
    return {
        pathname: Pages.Breakdown,
        search: createSearchParams({
            start: moment(start).format("yyyy-MM-DD"),
            end: moment(end).format("yyyy-MM-DD"),
        }).toString(),
    };
}

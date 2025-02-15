import { Moment } from "moment";
import Breakdown from "../types/Breakdown";


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
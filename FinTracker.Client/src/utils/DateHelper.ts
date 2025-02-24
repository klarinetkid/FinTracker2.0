import moment, { Moment } from "moment";

export function formatDateOnly(
    date: Moment | Date | string | undefined
): string {
    if (!date || !moment(date).isValid()) return "";
    return moment(date).format("yyyy-MM-DD");
}

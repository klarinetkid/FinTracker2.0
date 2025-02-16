import moment from "moment";

export function dateOnly(date: Date): string {
    return moment(date).format("yyyy-MM-DD");
}

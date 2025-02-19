export function classList(...classes: (string | undefined)[]): string {
    return classes.filter((c) => c && c.length > 0).join(" ");
}

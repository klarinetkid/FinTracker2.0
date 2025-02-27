export function isEmpty(str: string): boolean {
    return !str || str.length === 0;
}

export function pluralize(num: number): string {
    return num !== 1 ? "s" : "";
}

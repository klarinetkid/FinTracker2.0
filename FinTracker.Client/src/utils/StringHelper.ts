export function isEmpty(str: string): boolean {
    return !str || str.length === 0;
}

export function pluralize(num: number): string {
    return num !== 1 ? "s" : "";
}

export function getAnOrA(name: string) {
    return ["a", "e", "i", "o", "u"].indexOf(name[0].toLowerCase()) > -1
        ? "an"
        : "a";
}

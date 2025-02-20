export function sum(numbers?: (number | undefined)[]): number {
    if (!numbers || numbers.length === 0) return 0;
    return numbers.map((n) => n ?? 0).reduce((sum, i) => sum + i);
}

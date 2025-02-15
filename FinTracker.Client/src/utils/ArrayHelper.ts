
export function sum(numbers?: number[]): number {
    if (!numbers || numbers.length == 0) return 0;
    return numbers.reduce((sum, i) => sum + i)
}
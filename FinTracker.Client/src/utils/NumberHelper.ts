const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export function formatCurrency(
    cents: number | undefined | null,
    abs = false,
    showZero = false
): string {
    if (!cents && !showZero) return "";
    const dollarValue = (cents ?? 0) / 100;
    return USDollar.format(abs ? Math.abs(dollarValue) : dollarValue);
}

export function sum(numbers?: (number | undefined)[]): number {
    if (!numbers || numbers.length === 0) return 0;
    return numbers.map((n) => n ?? 0).reduce((sum, i) => sum + i);
}

export function dollarsToCents(
    dollars: number | string | undefined
): number | undefined {
    if (!dollars && dollars !== 0) return;
    const number = Number(dollars);
    if (isNaN(number)) return;
    return Math.floor(number * 100);
}

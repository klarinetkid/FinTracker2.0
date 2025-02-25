const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export function formatCurrency(
    cents: number | undefined,
    abs = false,
    showZero = false
): string {
    if (!cents && !showZero) return "";
    const dollarValue = (cents ?? 0) / 100;
    return USDollar.format(abs ? Math.abs(dollarValue) : dollarValue);
}

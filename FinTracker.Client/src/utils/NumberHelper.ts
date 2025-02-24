const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});
export function formatCurrency(cents: number | undefined, abs = false): string {
    if (!cents) return "";
    const dollarValue = cents / 100;
    return USDollar.format(abs ? Math.abs(dollarValue) : dollarValue);
}

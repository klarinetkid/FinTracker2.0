
const USDollar = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
export function formatCurrency(cents: number, abs: boolean = false): string {
    const dollarValue = cents / 100
    return USDollar.format(abs ? Math.abs(dollarValue) : dollarValue)
}

export function toFixed(num: number, places: number = 2) {
    const factor = 10 ** places
    return Math.floor(num * factor) / factor
}
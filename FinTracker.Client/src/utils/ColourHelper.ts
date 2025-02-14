
export function addToColour(hex: string, amt: number): string {
    const hexNum = Number("0x" + hex)
    const r = Math.min((hexNum >>> 16) + amt, 0xff)
    const g = Math.min((hexNum >>> 8 & 0xff) + amt, 0xff)
    const b = Math.min((hexNum & 0xff) + amt, 0xff)
    return ((r << 16) + (g << 8) + b).toString(16)
}

export function colourAvgValue(hex: string): number {
    const hexNum = Number("0x" + hex)
    const r = hexNum >>> 16
    const g = hexNum >>> 8 & 0xff
    const b = hexNum & 0xff
    return (r + b + g) / 3
}
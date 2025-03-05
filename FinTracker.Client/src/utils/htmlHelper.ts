export function classList(...classes: (string | undefined)[]): string {
    return classes.filter((c) => c && c.length > 0).join(" ");
}

export function blurActiveElement() {
    if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur();
}

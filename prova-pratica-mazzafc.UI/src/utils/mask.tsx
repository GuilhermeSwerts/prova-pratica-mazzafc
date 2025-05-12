export function maskValue(value: number, prefix: string) {
    return prefix + " " + value.toFixed(2)
}
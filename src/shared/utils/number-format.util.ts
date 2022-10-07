export const amountFormat = (value: number, min: number, max: number = min) =>
    new Intl.NumberFormat('en-US', {
        minimumFractionDigits: min,
        maximumFractionDigits: max,
    }).format(value);

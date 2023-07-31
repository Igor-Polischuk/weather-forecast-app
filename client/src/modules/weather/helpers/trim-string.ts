export function truncateString(str: string, length: number): string {
    if (str.length <= length) {
        return str;
    }

    return `${str.substring(0, length - 3)}...`
}
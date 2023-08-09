export function prependZero(number: number): string {
    if (number < 10 && number >= 0){
        return `0${number}`
    }

    return `${number}`
}
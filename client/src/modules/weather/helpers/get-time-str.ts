export function getTimeStr() {
    const date = new Date();
    const hours = date.getHours()
    const minutes = date.getMinutes();

    return `${addZero(hours)}:${addZero(minutes)}`;
}

function addZero(number: number): string {
    if (number < 10 && number >= 0){
        return `0${number}`
    }

    return `${number}`
}
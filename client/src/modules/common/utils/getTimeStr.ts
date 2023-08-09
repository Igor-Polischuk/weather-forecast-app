import { prependZero } from "./prependZero";

export function getTimeStr() {
    const date = new Date();
    const hours = date.getHours()
    const minutes = date.getMinutes();

    return `${prependZero(hours)}:${prependZero(minutes)}`;
}
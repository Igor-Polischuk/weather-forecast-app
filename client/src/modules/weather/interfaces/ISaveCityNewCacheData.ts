import { IWeather } from "./IWeather"

export interface ISaveCityNewCacheData {
    city: {
        fullname: string
    }
    weatherInCity: {
        weather: IWeather
    }
}
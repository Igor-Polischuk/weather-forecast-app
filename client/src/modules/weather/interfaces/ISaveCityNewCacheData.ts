export interface ISaveCityNewCacheData {
    city: {
        fullname: string
    }
    weatherInCity: {
        weather: {
            temperature: number
            feelsLike: number
            pressure: number
            humidity: number
            windSpeed: number
            weatherCondition: string
            weatherDescription: string
            icon: string
        }
    }
}
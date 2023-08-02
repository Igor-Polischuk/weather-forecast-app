import { currentCityVar } from "@/apollo/weather-vars";
import { useWeatherInUserCitiesQuery } from "@/gql";

export function useSavedCityWeather() {
    const { data, loading } = useWeatherInUserCitiesQuery(
        { variables: { page: 1, pageSize: 10 } });

    const weatherInfo = data?.getCurrentWeatherInUserCities.list.map(item => {
        const { weather } = item.weatherInCity

        return {
            city: item.city.fullname,
            temperature: weather.temperature,
            humidity: weather.humidity,
            pressure: weather.pressure,
            windSpeed: weather.windSpeed,
            weatherDescription: weather.weatherDescription,
            weatherCondition: weather.weatherCondition,
            icon: weather.icon,

            onClick() {
                currentCityVar(item.city.fullname);
            }
        }
    })

    return { weatherInfo: weatherInfo || [], loading, total: data?.getCurrentWeatherInUserCities.list.length || 0 }
}


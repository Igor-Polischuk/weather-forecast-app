import { currentCityVar } from "@/apollo/weather-vars";
import { useWeatherInUserCitiesQuery } from "@/gql";
import { CURRENT_WEATHER } from "../graphql/query/getCurrentWeather";

export function useSavedCityWeather() {
    const { data, loading, client } = useWeatherInUserCitiesQuery(
        { variables: { page: 1, pageSize: 10 }, });

    const weatherInfo = data?.getCurrentWeatherInUserCities.list.map(item => {
        const { weather } = item.weatherInCity

        client.writeQuery({
            query: CURRENT_WEATHER, 
            data: {
                currentWeather: {
                    __typename: 'Weather',
                    weather: {
                        ...weather,
                        __typename: 'WeatherInfo',
                    }
                },
            },
            variables: { cityName: item.city.fullname },
        });

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


import { CURRENT_WEATHER_QUERY } from "../graphql/query/getCurrentWeather";
import { currentCityVar } from "@/apollo/weather-vars";
import { useWeatherInUserCitiesQuery } from "@/gql";

interface IUseSavedCityWeatherReturningType {
    weatherInfo: {
        city: string;
        temperature: number;
        humidity: number;
        pressure: number;
        windSpeed: number;
        weatherDescription: string;
        weatherCondition: string;
        icon: string;
        onClick(): void;
    }[];
    loading: boolean;
    total: number;
}

export function useSavedCityWeather(): IUseSavedCityWeatherReturningType {
    const { data, loading, client } = useWeatherInUserCitiesQuery(
        { variables: { page: 1, pageSize: 10 }, });

    const weatherInfo = data?.getCurrentWeatherInUserCities.list.map(item => {
        const { weather } = item.weatherInCity

        client.writeQuery({
            query: CURRENT_WEATHER_QUERY,
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
    }) || []

    return { weatherInfo, loading, total: weatherInfo.length }
}


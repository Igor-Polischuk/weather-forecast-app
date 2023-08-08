import { ApolloCache } from "@apollo/client";
import { WeatherInUserCitiesQuery, GetCurrentWeatherQuery } from "@/gql";
import { CURRENT_WEATHER_QUERY } from "../graphql/query/getCurrentWeather";

interface IUpdateCacheParams {
  cache: ApolloCache<WeatherInUserCitiesQuery>;
  city: string;
  action: 'ADD' | 'REMOVE';
}

export function updateCitiesWeatherCache({ cache, city, action }: IUpdateCacheParams) {
  cache.modify({
    fields: {
      getCurrentWeatherInUserCities(existingCitiesData: WeatherInUserCitiesQuery['getCurrentWeatherInUserCities']) {
        if (action === 'ADD') {
          const weatherInSavedCity = cache.readQuery({
            query: CURRENT_WEATHER_QUERY,
            variables: { cityName: city },
          }) as GetCurrentWeatherQuery;

          const newItem = {
            __typename: "UserCitiesCurrentWeather",
            city: {
              __typename: "City",
              fullname: city,
            },
            weatherInCity: {
              __typename: "CurrentWeatherOutput",
              weather: weatherInSavedCity.currentWeather.weather,
            },
          };

          return {
            ...existingCitiesData,
            list: [...existingCitiesData.list, newItem],
          };
        } else if (action === 'REMOVE') {
          return {
            ...existingCitiesData,
            list: existingCitiesData.list.filter((cityData) => cityData.city.fullname !== city),
          };
        }

        return existingCitiesData;
      },
    },
  });
}

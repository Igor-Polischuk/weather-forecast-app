import { ApolloError, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";

import { GetCurrentWeatherQuery, useGetCurrentWeatherLazyQuery } from "@/gql";
import { currentCityVar } from "@/modules/weather/vars/city-vars";
import { useSavedCityWeather } from "./useSavedCityWeather";

interface IUseWeatherDataReturningType {
  data: GetCurrentWeatherQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  cityName: string;
}

export function useWeatherData(): IUseWeatherDataReturningType {
  const [getCityWeather, { data, loading: weatherLoading, error }] = useGetCurrentWeatherLazyQuery();
  const { weatherInfo, loading: cityLoading, total } = useSavedCityWeather();
  const cityName = useReactiveVar(currentCityVar);

  const loading = !error && (!data?.currentWeather && total > 0) || weatherLoading || cityLoading

  useEffect(() => {
    if (cityName === "" && weatherInfo.length > 0) {
      currentCityVar(weatherInfo[0].city);
    }
  }, [cityName, weatherInfo]);

  useEffect(() => {
    if (cityName !== '') {
      getCityWeather({ variables: { cityName } });
    }
  }, [cityName, getCityWeather])

  return { data, loading, error, cityName };
}
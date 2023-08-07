import { ApolloError, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";

import { GetCurrentWeatherQuery, useGetCurrentWeatherLazyQuery } from "@/gql";
import { currentCityVar } from "@/apollo/weather-vars";

interface IUseWeatherDataReturningType {
  data: GetCurrentWeatherQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
}

export function useWeatherData(): IUseWeatherDataReturningType {
  const cityName = useReactiveVar(currentCityVar);
  const isCitySelected = cityName.trim() !== "";
  const [getCityWeather, { data, loading, error }] = useGetCurrentWeatherLazyQuery();

  useEffect(() => {
    if (isCitySelected) {
      getCityWeather({ variables: { cityName } });
    }
  }, [cityName, getCityWeather, isCitySelected]);

  return { data, loading, error };
}
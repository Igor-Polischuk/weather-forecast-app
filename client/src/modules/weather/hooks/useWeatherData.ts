import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";

import { currentCityVar } from "@/apollo/weather-vars";
import { useGetCurrentWeatherLazyQuery } from "@/gql";

export function useWeatherData() {
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
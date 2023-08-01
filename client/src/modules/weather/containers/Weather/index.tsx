import { useReactiveVar } from "@apollo/client";
import { Space } from "antd";

import { CurrentWeather } from "./CurrentWeather";
import { Forecast } from "./Forecast";

import { currentCityVar } from "@/apollo/weather-vars";
import { WeatherMessage } from "./WeatherMessage";
import { CurrentWeatherAdditional } from "./CurrentWeatherAdditional";
import { useEffect } from "react";
import { useGetCurrentWeatherLazyQuery, useUserCitiesQuery } from "@/gql";

export const Weather = () => {
  const { data } = useUserCitiesQuery();
  const cityName = useReactiveVar(currentCityVar);
  const isCitySelected = cityName.trim() !== "";
  const [getCityWeather, { error }] = useGetCurrentWeatherLazyQuery();

  if (
    cityName === "" &&
    data?.cities &&
    data.cities.length > 0
  ) {
    currentCityVar(data.cities[0].fullname)
  }
    useEffect(() => {
      if (isCitySelected) {
        getCityWeather({ variables: { cityName } });
      }
    }, [cityName, getCityWeather, isCitySelected]);

  if (!isCitySelected) {
    return (
      <WeatherMessage text="Use search panel to find weather in your city" />
    );
  }

  if (error) {
    return <WeatherMessage text={error.message} />;
  }

  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <CurrentWeather cityName={cityName} />
      <CurrentWeatherAdditional cityName={cityName} />
      <Forecast cityName={cityName} />
    </Space>
  );
};

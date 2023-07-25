import { useReactiveVar } from "@apollo/client";
import { Space } from "antd";

import { CurrentWeather } from "./components/CurrentMain";
import { Forecast } from "./components/Forecast";

import { currentCityVar } from "@/apollo/weather-vars";
import { WeatherMessage } from "./components/WeatherMessage";
import { CurrentAdditional } from "./components/CurrentAdditional/indes";
import { useEffect } from "react";
import { useGetCurrentWeatherLazyQuery } from "@/gql";

export const Weather = () => {
  const cityName = useReactiveVar(currentCityVar);
  const isCitySelected = cityName.trim() !== "";
  const [getCityWeather, { error }] = useGetCurrentWeatherLazyQuery();

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
      <Forecast cityName={cityName} />
      <CurrentAdditional cityName={cityName} />
    </Space>
  );
};

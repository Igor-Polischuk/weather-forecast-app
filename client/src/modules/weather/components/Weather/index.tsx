import { useReactiveVar } from "@apollo/client";
import { Skeleton, Space } from "antd";

import { CurrentWeatherMainInfo } from "../../UI/CurrentWeatherMainInfo";
import { AdditionalWeatherInfo } from "../../UI/AdditionalWeatherInfo";
import { useSavedCityWeather } from "../../hooks/useSavedCityWeather";
import { WeatherMessage } from "../../UI/WeatherMessage";
import { useWeatherData } from "../../hooks/useWeatherData";
import { currentCityVar } from "@/apollo/weather-vars";
import { Forecast } from "../Forecast";
import { SaveCity } from "../SaveCity";

import styles from "./styles.module.scss";

export const Weather = () => {
  const { weatherInfo } = useSavedCityWeather();
  const cityName = useReactiveVar(currentCityVar);
  const isCitySelected = cityName.trim() !== "";

  if (cityName === "" && weatherInfo.length > 0) {
    currentCityVar(weatherInfo[0].city);
  }
  
  const { data, loading, error } = useWeatherData();

  if (loading) {
    return <Skeleton active />;
  }

  if (!isCitySelected || !data?.currentWeather || error) {
    const messageText = error ? error.message : "Use the search panel to find weather in your city";
    return <WeatherMessage text={messageText} />;
  }

  const {
    temperature,
    feelsLike,
    icon,
    weatherDescription,
    weatherCondition,
    humidity,
    pressure,
    windSpeed,
  } = data.currentWeather.weather;

  return (
    <Space direction="vertical" size="large" className={styles.wrapper}>
      <CurrentWeatherMainInfo
        city={cityName}
        feelsLike={feelsLike}
        icon={icon}
        temperature={temperature}
        weatherDesc={weatherDescription}
        weatherMain={weatherCondition}
        button={<SaveCity />}
      />
      <AdditionalWeatherInfo
        humidity={humidity}
        pressure={pressure}
        windSpeed={windSpeed}
      />
      <Forecast cityName={cityName} />
    </Space>
  );
};

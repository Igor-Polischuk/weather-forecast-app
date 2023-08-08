import { Skeleton, Space } from "antd";

import { CurrentWeatherMainInfo } from "../../UI/CurrentWeatherMainInfo";
import { AdditionalWeatherInfo } from "../../UI/AdditionalWeatherInfo";
import { WeatherMessage } from "../../UI/WeatherMessage";
import { useWeatherData } from "../../hooks/useWeatherData";
import { Forecast } from "../Forecast";
import { SaveCity } from "../SaveCity";

import styles from "./styles.module.scss";
import { useDefaultCity } from "../../hooks/useDefaultCity";

export const Weather = () => {
  const { data, loading, error } = useWeatherData();
  const { cityName, loading: cityLoading, isCity } = useDefaultCity();

  if (loading || cityLoading) {
    return <Skeleton active />;
  }

  if (!isCity || error) {
    const messageText = error
      ? error.message
      : "Use the search panel to find weather in your city";
    return <WeatherMessage text={messageText} />;
  }

  if (data?.currentWeather) {
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
  }
};

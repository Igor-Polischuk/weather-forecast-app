import { Empty, Skeleton, Space } from "antd";

import { CurrentWeatherMainInfo } from "@modules/weather/UI/CurrentWeatherMainInfo";
import { AdditionalWeatherInfo } from "@modules/weather/UI/AdditionalWeatherInfo";
import { useWeatherData } from "@modules/weather/hooks/useWeatherData";

import { Forecast } from "../Forecast";
import { CitySaveRemoveToggle } from "../CitySaveRemoveToggle";

import styles from "./styles.module.scss";

export const Weather = () => {
  const { data, loading, error, cityName } = useWeatherData();

  if (loading) {
    return <Skeleton active />;
  }

  if (!data?.currentWeather || error) {
    const [message, image] = error
      ? [
          error.message,
          "https://img.freepik.com/free-icon/computer_318-365870.jpg?size=626&ext=jpg&ga=GA1.2.53924716.1685835618&semt=sph",
        ]
      : [
          "Use the search panel to find weather in your city",
          "https://img.freepik.com/premium-vector/data-search-found-illustration-concept_108061-574.jpg?size=626&ext=jpg&ga=GA1.1.53924716.1685835618&semt=ais",
        ];

    return <Empty description={message} image={image} />;
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
        button={<CitySaveRemoveToggle />}
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

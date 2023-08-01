import { Card, Row, Skeleton, Tabs } from "antd";
import { FC } from "react";

import { ForecastItem } from "./ForecastItem";
import { useGetForecastQuery } from "@/gql";

import { WeatherByDay, groupWeatherByDay } from "@/modules/weather/helpers/group-weather-by-day";
import styles from "./styles.module.scss";

interface IForecastProps {
  cityName: string;
}

export const Forecast: FC<IForecastProps> = ({ cityName }) => {
  const { data, loading, error } = useGetForecastQuery({ variables: { cityName } });

  if (loading) {
    return <Skeleton />;
  }

  if (!data?.forecast || error) {
    return null;
  }

  const weatherByDay = groupWeatherByDay(data.forecast.items);

  const renderForecastItems = (weatherPerDay: WeatherByDay) => {
    return weatherPerDay.data.map((weather, i) => {
      const temp = Math.round(weather.temperature);
      const pop = Math.round(weather.pop * 100);
      return (
        <ForecastItem
          icon={weather.icon}
          temperature={temp}
          pop={pop}
          time={weather.time}
          weather={weather.weatherDescription}
          key={i}
          humidity={weather.humidity}
          pressure={weather.pressure}
          windSpeed={weather.windSpeed}
        />
      );
    });
  };

  const tabsData = weatherByDay.map((weatherPerDay, i) => {
    return {
      label: weatherPerDay.dayName,
      key: `${weatherPerDay.dayName}&${i}`,
      children: <div>{renderForecastItems(weatherPerDay)}</div>,
    };
  });

  return (
    <Card className={styles.forecastWrapper}>
      <Row>
        <p className={styles.title}>Forecast</p>
      </Row>
      <Tabs defaultActiveKey="1" type="card" size="middle" items={tabsData} />
    </Card>
  );
};
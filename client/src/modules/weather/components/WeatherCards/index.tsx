import { animated, useTransition } from "@react-spring/web";
import { Card, Skeleton, Space } from "antd";

import { useSavedCityWeather } from "../../hooks/useSavedCityWeather";
import { WeatherCard } from "../WeatherCard";
import { SaveCity } from "../SaveCity";

import styles from "./style.module.scss";

export const WeatherCards = () => {
  const { weatherInfo, total, loading } = useSavedCityWeather();

  const weatherCards = useTransition(weatherInfo, {
    key: (data: { city: string }) => data.city,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 200,
    },
  });

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <Card
      title={<CardHeader citiesLength={total} />}
      style={{ gap: 0 }}
      bodyStyle={{ overflowY: "auto", padding: 15 }}
      headStyle={{ minHeight: "auto" }}
      className={styles.cards}
    >
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        {weatherCards((style, cityWeatherData) => (
          <animated.div style={style}>
            <WeatherCard
              city={cityWeatherData.city}
              icon={cityWeatherData.icon}
              onCardClick={cityWeatherData.onClick}
              temperature={cityWeatherData.temperature}
              weather={cityWeatherData.weatherDescription}
            />
          </animated.div>
        ))}
      </Space>
    </Card>
  );
};

const CardHeader = ({ citiesLength }: { citiesLength: number }) => {
  return (
    <div className={styles.cardHeader}>
      <p>{`Saved cities ${citiesLength}/${import.meta.env.VITE_CITY_LIMIT}`}</p>
      <SaveCity />
    </div>
  );
};

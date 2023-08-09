import { animated, useTransition } from "@react-spring/web";
import { Card, Skeleton, Space } from "antd";
import { CSSProperties } from "react";

import { useSavedCityWeather } from "@modules/weather/hooks/useSavedCityWeather";
import { WeatherCard } from "../WeatherCard";

import styles from "./style.module.scss";
import { RemoveCity } from "../RemoveCity";

const cardBodyStyles: CSSProperties = {
  overflowY: "auto",
  padding: 15,
};

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
      title={`Saved cities ${total}/${import.meta.env.VITE_CITY_LIMIT}`}
      bodyStyle={cardBodyStyles}
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
              cardButton={<RemoveCity city={cityWeatherData.city}/>}
            />
          </animated.div>
        ))}
      </Space>
    </Card>
  );
};

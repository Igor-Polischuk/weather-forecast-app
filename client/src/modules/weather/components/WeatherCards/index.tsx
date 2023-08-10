import { animated, useTransition } from "@react-spring/web";
import { useReactiveVar } from "@apollo/client";
import { Card, Empty, Skeleton, Space } from "antd";
import { CSSProperties } from "react";

import { useSavedCityWeather } from "@modules/weather/hooks/useSavedCityWeather";
import { WeatherCard } from "@modules/weather/UI/WeatherCard";
import { currentCityVar } from "@/modules/weather/vars/city-vars";
import { RemoveCity } from "../RemoveCity";

import styles from "./style.module.scss";
import { CitySaveRemoveToggle } from "../CitySaveRemoveToggle";

const cardBodyStyles: CSSProperties = {
  overflowY: "auto",
  padding: 15,
};

export const WeatherCards = () => {
  const { weatherInfo, total, loading } = useSavedCityWeather();
  const city = useReactiveVar(currentCityVar);

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
      {total > 0 ? (
        <Space direction="vertical" size="large" style={{ display: "flex" }}>
          {weatherCards((style, cityWeatherData) => (
            <animated.div style={style}>
              <WeatherCard
                city={cityWeatherData.city}
                icon={cityWeatherData.icon}
                onCardClick={cityWeatherData.onClick}
                temperature={cityWeatherData.temperature}
                active={cityWeatherData.city === city}
                weather={cityWeatherData.weatherDescription}
                cardButton={<RemoveCity city={cityWeatherData.city} />}
              />
            </animated.div>
          ))}
        </Space>
      ) : (
        <Empty
          description="No saved cities yet"
          image="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg?size=626&ext=jpg&ga=GA1.1.53924716.1685835618&semt=ais"
        >
          <CitySaveRemoveToggle />
        </Empty>
      )}
    </Card>
  );
};

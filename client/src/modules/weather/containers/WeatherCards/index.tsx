import { animated, useTransition } from "@react-spring/web";
import { Card, Space } from "antd";

import { SaveCity } from "../SaveCity";

import styles from "./style.module.scss";
import { useSavedCityWeather } from "../../hooks/useSavedCityWeather";
import { WeatherCard } from "../WeatherCard";

export const WeatherCards = () => {
  // const { data, loading } = useUserCitiesQuery();

  // const weatherCards = useTransition(data?.cities, {
  //   key: (city: { fullname: string }) => city.fullname,
  // from: { opacity: 0 },
  // enter: { opacity: 1 },
  // leave: { opacity: 0 },
  // config: {
  //   duration: 200,
  // },
  // });

  // if (loading){
  //   return <p>loading...</p>
  // }

  // if (!data?.cities) {
  //   return <p>Something was wrong</p>;
  // }

  // const noCity = data.cities.length === 0;
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

  // const noCity = total === 0;

  if (loading){
    return <p>loading...</p>
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
        {/* {noCity ? (
          <Card>You haven't saved any city yet</Card>
        ) : (
          weatherCards((style, city) => (
            <animated.div style={style}>
              <SavedCityWeatherCard city={city!} />
            </animated.div>
          ))
        )} */}
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

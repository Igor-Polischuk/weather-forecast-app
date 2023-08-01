import { animated, useTransition } from "@react-spring/web";
import { Card, Space } from "antd";

import { SavedCityWeatherCard } from "../WeatherCard";
import { useUserCitiesQuery } from "@/gql";
import { SaveCity } from "../SaveCity";

import styles from "./style.module.scss";

export const WeatherCards = () => {
  const { data, loading } = useUserCitiesQuery();

  const weatherCards = useTransition(data?.cities, {
    key: (city: { fullname: string }) => city.fullname,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 200,
    },
  });

  if (loading){
    return <p>loading...</p>
  }

  if (!data?.cities) {
    return <p>Something was wrong</p>;
  }


  const noCity = data.cities.length === 0;

  return (
    <Card
      title={<CardHeader citiesLength={data.cities.length} />}
      style={{ gap: 0 }}
      bodyStyle={{ overflowY: "auto", padding: 15 }}
      headStyle={{minHeight: 'auto'}}
      className={styles.cards}
    >
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        {noCity ? (
          <Card>You haven't saved any city yet</Card>
        ) : (
          weatherCards((style, city) => (
            <animated.div style={style}>
              <SavedCityWeatherCard city={city!} />
            </animated.div>
          ))
        )}
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

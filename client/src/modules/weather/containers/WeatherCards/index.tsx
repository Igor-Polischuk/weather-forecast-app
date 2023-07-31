import { animated, useTransition } from "@react-spring/web";
import { Card, Space } from "antd";

import { SavedCityWeatherCard } from "../WeatherCard";
import { useCurrentUserQuery } from "@/gql";
import { SaveCity } from "../SaveCity";

import styles from "./style.module.scss";

export const WeatherCards = () => {
  const { data } = useCurrentUserQuery();

  if (!data?.currentUser) {
    return <p>Something was wrong</p>;
  }

  const isCity = data.currentUser.cities.length === 0;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const weatherCards = useTransition(data.currentUser.cities, {
    key: (city: { fullname: string }) => city.fullname,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 200,
    },
  });

  return (
    <Card
      title={<CardHeader citiesLength={data.currentUser.cities.length} />}
      style={{ gap: 0 }}
      bodyStyle={{ overflowY: "auto", padding: 15 }}
      headStyle={{minHeight: 'auto'}}
      className={styles.cards}
    >
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        {isCity ? (
          <Card>You haven't saved any city yet</Card>
        ) : (
          weatherCards((style, city) => (
            <animated.div style={style}>
              <SavedCityWeatherCard city={city} />
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

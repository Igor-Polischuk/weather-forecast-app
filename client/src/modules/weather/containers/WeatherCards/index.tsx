import { Card, Space } from "antd";

import {
  useCurrentUserQuery,
} from "@/gql";
import { SavedCityWeatherCard } from "../WeatherCard";

import styles from "./style.module.scss";

export const WeatherCards = () => {
  const { data } = useCurrentUserQuery();


  if (!data?.currentUser) {
    return <p>Something was wrong</p>;
  }

  const weatherCards = data.currentUser.cities.map((city, i) => {
    return <SavedCityWeatherCard city={city} key={i} />;
  });

  return (
    <Card
      title="Saved cities"
      style={{ gap: 0 }}
      bodyStyle={{ overflowY: "auto", padding: 15 }}
      className={styles.cards}
    >
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        {weatherCards}
      </Space>
    </Card>
  );
};

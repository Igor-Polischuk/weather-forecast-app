import { Card, Space } from "antd";
import { WeatherCard } from "../WeatherCard";

import styles from "./style.module.scss";

export const WeatherCards = () => {
  return (
    <Card
      title="Saved cities"
      style={{ gap: 0 }}
      bodyStyle={{ overflowY: "auto", padding: 15 }}
      className={styles.cards}
    >
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
      </Space>
    </Card>
  );
};

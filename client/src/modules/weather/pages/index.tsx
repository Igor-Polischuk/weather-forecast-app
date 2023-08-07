import { Space } from "antd";

import { WeatherDashboard } from "../UI/WeatherDashboard";
import { TopBar } from "../UI/TopBar";

import styles from "./styles.module.scss";

export const WeatherPage = () => {
  return (
    <Space
      direction="vertical"
      size="large"
      style={{ display: "flex" }}
      className={styles.weatherPage}
    >
      <TopBar />
      <WeatherDashboard />
    </Space>
  );
};

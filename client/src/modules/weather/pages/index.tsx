import { Space } from "antd";
import { FC } from "react";

import { WeatherDashboard } from "@modules/weather/UI/WeatherDashboard";
import { TopBar } from "@modules/weather/UI/TopBar";

import styles from "./styles.module.scss";

export const WeatherPage: FC = () => {
  return (
    <Space
      direction="vertical"
      size="large"
      className={styles.weatherPage}
    >
      <TopBar />
      <WeatherDashboard />
    </Space>
  );
};

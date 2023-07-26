import { Space } from "antd";
import { WeatherDashboard } from "../containers/WeatherDashboard";
import styles from "./styles.module.scss";
import { TopBar } from "../containers/TopBar";

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

import { Space } from "antd";
import { WeatherDashboard } from "../components/WeatherDashboard";
import styles from "./styles.module.scss";
import { TopBar } from "../components/TopBar";

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

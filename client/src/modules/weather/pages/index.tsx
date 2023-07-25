import { Space } from "antd";
import { TopBar } from "../components/TopBar";
import { WeatherDashboard } from "../components/WeatherDashboard";
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

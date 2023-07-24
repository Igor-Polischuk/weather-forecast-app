import { Space } from "antd";
import { TopBar } from "../components/TopBar";
import { Weather } from "../components/Weather";
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
      <Weather />
    </Space>
  );
};

import { CurrentWeather } from "../components/CurrentWeather";
import { WeatherCard } from "../components/WeatherCard";
import { WeatherHeader } from "../components/WeatherHeader";

import styles from "./styles.module.scss";
import { Col, Row } from "antd";

export const WeatherPage = () => {

  return (
    <div className={styles.weatherPage}>
      <WeatherHeader/>
      <Row justify={"space-between"}>
        <Col span={16}>
            <CurrentWeather/>
        </Col>
        <Col span={6}>
            <WeatherCard/>
        </Col>
      </Row>
    </div>
  );
};

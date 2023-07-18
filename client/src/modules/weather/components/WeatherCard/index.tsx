// @flow
import { FC } from "react";

import styles from "./styles.module.scss";
import { Col, Row } from "antd";

import sunny from "@/assets/sunny.svg"; 


interface IWeatherCardProps {
  city?: string;
  temperature?: number;
  icon?: JSX.Element;
}

export const WeatherCard: FC<IWeatherCardProps> = ({
  city = "Kyiv",
  temperature = 28,
}) => {
  city;
  temperature;
  return (
    <div className={styles.weatherCard}>
      <Row justify={"space-between"}>
        <Col span={12}>
          <p className={styles.temperature}>{temperature}<span> °C</span></p>
        </Col>
        <Col span={12}>
          <img src={sunny} alt="sunny" />
        </Col>
      </Row>
      <Row>
        <Col>
            <p>{city}</p>
        </Col>
      </Row>
    </div>
  );
};

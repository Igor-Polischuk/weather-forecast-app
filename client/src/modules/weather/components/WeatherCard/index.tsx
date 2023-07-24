// @flow
import { FC } from "react";

import { Card, Col, Row } from "antd";

import styles from "./styles.module.scss";
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
    <Card bodyStyle={{padding: 5}} className={styles.weatherCard}>
      <Row className={styles.weatherCard} align={"middle"} justify={"space-between"}>
      <Col xl={3}>
        <Row align={"middle"}>
        <img src={sunny} alt="Sunny icon"/>
        </Row>
      </Col>
      <Col xl={12}>
        <div>
          <p className={styles.city}>{city}</p>
          <p>Sunny, clear sky</p>
        </div>
      </Col>
      <Col xl={5}>
        <Row justify={"end"}>
          <p className={styles.temperature} >{temperature}°</p>
        </Row>
      </Col>
    </Row>
    </Card>
  );
};

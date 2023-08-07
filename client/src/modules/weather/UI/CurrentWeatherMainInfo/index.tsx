import { Card, Row, Col } from "antd";
import { FC } from "react";

import styles from "./styles.module.scss";
import { getTimeStr } from "../../helpers/get-time-str";

interface ICurrentWeatherMainInfoProps {
  city: string;
  temperature: number;
  feelsLike: number;
  icon: string;
  weatherMain: string;
  weatherDesc: string;
  button?: JSX.Element;
}

export const CurrentWeatherMainInfo: FC<ICurrentWeatherMainInfoProps> = ({
  city,
  icon,
  temperature,
  weatherDesc,
  weatherMain,
  feelsLike,
  button
}) => {
  return (
    <Card
      className={styles.currentWeather}
      title={
        <Row justify={"space-between"} align={"middle"}>
          <Col md={18}>{`${city} as of ${getTimeStr()}`}</Col>
          <Col md={6}>{button}</Col>
        </Row>
      }
    >
      <Row justify={"space-between"}>
        <Col span={16}>
          <p className={styles.temp}>
            {Math.round(temperature)}
            <span className={styles.tempSymbol}>°C</span>
          </p>
          <p>{`${weatherMain}, ${weatherDesc}`}</p>
          <p className={styles.addInfo}>{`Feeling like ${Math.round(
            feelsLike
          )} °C`}</p>
        </Col>
        <Col span={8} className={styles.iconBlock}>
          <img
            src={icon}
            alt={`icon of ${weatherDesc}`}
            className={`${styles.weatherIcon}`}
          />
        </Col>
      </Row>
    </Card>
  );
};

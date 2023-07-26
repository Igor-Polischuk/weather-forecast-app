import { Card, Row, Col } from "antd";
import { FC } from "react";

import styles from "./styles.module.scss";

interface IWeatherCardDisplayProps {
  city: string;
  weather: string;
  temperature: number;
  icon: string;
  onCardClick: () => void;
}
export const WeatherCardDisplay: FC<IWeatherCardDisplayProps> = ({
  city,
  icon,
  temperature,
  weather,
  onCardClick,
}) => {
  return (
    <Card
      bodyStyle={{ padding: 5 }}
      className={`${styles.weatherCard} fade`}
      onClick={onCardClick}
    >
      <Row
        className={styles.weatherCard}
        align={"middle"}
        justify={"space-between"}
      >
        <Col xl={3}>
          <Row align={"middle"}>
            <img src={icon} alt={`icon of ${weather}`} />
          </Row>
        </Col>
        <Col xl={12}>
          <div>
            <p className={styles.city}>{city}</p>
            <p>{`${weather}`}</p>
          </div>
        </Col>
        <Col xl={5}>
          <Row justify={"end"}>
            <p className={styles.temperature}>{Math.round(temperature)}°</p>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

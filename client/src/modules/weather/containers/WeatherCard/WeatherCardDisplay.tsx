import { Card, Row, Col, Tooltip } from "antd";
import { FC } from "react";

import { truncateString } from "../../helpers/trim-string";
import styles from "./styles.module.scss";

interface IWeatherCardDisplayProps {
  city: string;
  weather: string;
  temperature: number;
  icon: string;
  onCardClick: () => void;
  active?: boolean
}
export const WeatherCardDisplay: FC<IWeatherCardDisplayProps> = ({
  city,
  icon,
  temperature,
  weather,
  onCardClick,
  active
}) => {
  return (
    <Card
      bodyStyle={{ padding: 5 }}
      className={`${styles.weatherCard} fade ${active ? styles.active : ''}`}
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
        <Col xl={14} offset={1}>
          <div>
            <Tooltip title={city}>
              <p className={styles.city}>{truncateString(city, 21)}</p>
            </Tooltip>
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

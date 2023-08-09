import { Card, Row, Col, Tooltip } from "antd";
import { FC } from "react";

import { truncateString } from "@modules/weather/helpers/trim-string";
import { currentCityVar } from "@/apollo/weather-vars";
import { useReactiveVar } from "@apollo/client";

import styles from "./styles.module.scss";

interface IWeatherCardProps {
  city: string;
  weather: string;
  temperature: number;
  icon: string;
  onCardClick: () => void;
  cardButton?: JSX.Element
}

export const WeatherCard: FC<IWeatherCardProps> = ({
  city,
  icon,
  temperature,
  weather,
  onCardClick,
  cardButton,

}) => {
  const currentCity = useReactiveVar(currentCityVar);

  const active = currentCity === city;

  return (
    <Card
      bodyStyle={{ padding: 5 }}
      className={`${styles.weatherCard} fade ${active ? styles.active : ''}`}
      onClick={onCardClick}
      tabIndex={0}
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
          <Row justify={"end"} align={"middle"} className={styles.tempRow}>
            <p className={styles.temperature}>{Math.round(temperature)}°С</p>
            {cardButton}
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

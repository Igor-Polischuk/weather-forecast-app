import { Card, Row, Col } from "antd";
import { FC } from "react"

import styles from "./styles.module.scss";

interface ICurrentWeatherMainInfoProps {
    city: string
    temperature: number
    minTemp: number
    maxTemp: number
    feelsLike: number
    icon: string
    weatherMain: string
    weatherDesc: string
    saveCityBtn: JSX.Element
}

export const CurrentWeatherMainInfo: FC<ICurrentWeatherMainInfoProps> = ({
    city,
    feelsLike,
    icon,
    maxTemp,
    minTemp,
    temperature,
    weatherDesc,
    weatherMain,
    saveCityBtn
}) => {
    return (
        <Card className={styles.currentWeather}>
      <Row justify={"space-between"}>
        <Col span={14}>
          <div className={styles.cityName}>
            <p>{city}</p>
            {saveCityBtn}
          </div>
          <p className={styles.temp}>
            {Math.round(temperature)}
            <span className={styles.tempSymbol}>°</span>
          </p>
          <p className={styles.addInfo}>
            {Math.round(maxTemp)}°/
            {Math.round(minTemp)}° Feels like{" "}
            {Math.round(feelsLike)}°
          </p>
        </Col>
        <Col span={8} className={styles.iconBlock}>
          <img
            src={icon}
            alt={`icon of ${weatherDesc}`}
            className={`${styles.weatherIcon}`}
          />
          <p
            className={styles.weatherDescription}
          >{`${weatherMain}, ${weatherDesc}`}</p>
        </Col>
      </Row>
    </Card>
    );
};
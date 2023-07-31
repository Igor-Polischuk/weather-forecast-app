import { FC } from "react";

import drop from "@assets/drop.png";
import styles from "./styles.module.scss";
import { Col, Collapse, Row } from "antd";


interface IForecastItemProps {
  temperature: number;
  icon: string;
  time: string;
  pop: number;
  weather: string;
  windSpeed: number
  humidity: number
  pressure: number
}

export const ForecastItem: FC<IForecastItemProps> = (props) => {
  return (
    <Collapse
      className={styles.forecastItem}
      expandIconPosition='end'
      items={[
        {
          label: getLabel(props),
          children: (
            <Row justify={'space-between'} className={styles.additional}>
                <p>Wind speed: {Math.round(props.windSpeed)} m/s</p>
                <p>Humidity: {props.humidity}%</p>
                <p>Pressure: {props.pressure} hPa</p>
            </Row>
          ),
          style: { borderRadius: 0 },
        },
      ]}
    />
  );
};

const getLabel = ({ icon,
    temperature,
    time,
    pop,
    weather,
  }: IForecastItemProps) => {
    return (
        <Row justify={"space-between"} align={"middle"}>
          <Col span={2} className={styles.time}>
            <p>{time}</p>
          </Col>
          <Col span={4} className={styles.temperature}>
            <p>{temperature} °C</p>
          </Col>
          <Col span={10} className={styles.weather}>
            <img src={icon} alt={`${weather} icon`} />
            <p>{weather}</p>
          </Col>
          <Col span={2} className={styles.pop}>
            <img src={drop} alt="drop" />
            <span>{pop}%</span>
          </Col>
        </Row>
      );
  }
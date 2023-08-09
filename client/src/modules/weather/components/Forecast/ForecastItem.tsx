import { Col, Collapse, Row } from "antd";
import { FC } from "react";

import styles from "./styles.module.scss";
import drop from "@assets/drop.png";


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
          label: <ForecastItemLabel {...props}/>,
          children: (
            <Row justify={'space-between'} className={styles.additional}>
                <p><span>Wind speed:</span> <span>{Math.round(props.windSpeed)} m/s</span></p>
                <p><span>Humidity:</span> <span>{props.humidity}%</span></p>
                <p><span>Pressure:</span> <span>{props.pressure} hPa</span></p>
            </Row>
          ),
          style: { borderRadius: 0 },
        },
      ]}
    />
  );
};

const ForecastItemLabel = ({ icon,
    temperature,
    time,
    pop,
    weather,
  }: IForecastItemProps) => {
    return (
        <Row justify={"space-between"} align={"middle"} tabIndex={0} role="link">
          <Col span={2} xs={4} className={styles.time}>
            <p>{time}</p>
          </Col>
          <Col span={4} xs={5}  className={styles.temperature}>
            <p>{temperature} °C</p>
          </Col>
          <Col span={10} xs={12} className={styles.weather}>
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
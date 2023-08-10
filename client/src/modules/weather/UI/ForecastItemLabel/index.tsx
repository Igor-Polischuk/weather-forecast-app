import { Row, Col } from "antd";
import { FC } from "react";

import { IForecastItemProps } from "@modules/weather/UI/ForecastItem";

import styles from "./styles.module.scss";
import drop from "@assets/images/drop.png";

export const ForecastItemLabel: FC<IForecastItemProps> = ({ icon,
    temperature,
    time,
    pop,
    weatherDescription,
  }) => {
    return (
        <Row justify={"space-between"} align={"middle"} tabIndex={0} role="link">
          <Col span={2} xs={4} className={styles.time}>
            <p>{time}</p>
          </Col>
          <Col span={4} xs={5}  className={styles.temperature}>
            <p>{temperature} °C</p>
          </Col>
          <Col span={10} xs={12} className={styles.weather}>
            <img src={icon} alt={`${weatherDescription} icon`} />
            <p>{weatherDescription}</p>
          </Col>
          <Col span={2} className={styles.pop}>
            <img src={drop} alt="drop" />
            <span>{pop}%</span>
          </Col>
        </Row>
      );
  }
import { Collapse, Row } from "antd";
import { FC } from "react";

import { IWeather } from "@modules/weather/interfaces/IWeather";
import { ForecastItemLabel } from "@modules/weather/UI/ForecastItemLabel";

import styles from "./styles.module.scss";

export interface IForecastItemProps extends Omit<IWeather, 'weatherCondition' | 'feelsLike'> {
  time: string;
  pop: number
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
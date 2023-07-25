import { Card, Row, Skeleton } from "antd";
import { FC } from "react";

import { ForecastItem } from "./ForecastItem";
import { useGetForecastQuery } from "@/gql";

import styles from "./styles.module.scss";
import sunny from "@/assets/sunny.svg";

interface IForecastProps {
  cityName: string;
}

export const Forecast: FC<IForecastProps> = ({ cityName }) => {
  const { data, loading } = useGetForecastQuery({ variables: { cityName } });

  if (loading) {
    return <Skeleton />;
  }

  if (!data?.forecast) {
    return null;
  }

  const forecastItems = data.forecast.items.map((weather, i) => {
    const temp = Math.round(weather.temperature);
    const pop = (Math.round(weather.pop * 100));
    const time = new Date(weather.date);
    const timeStr = `${time.getHours()}:00`

    return (
      <ForecastItem
        icon={<img src={sunny} />}
        temperature={temp}
        pop={pop}
        time={timeStr}
        key={i}
      />
    );
  });

  return (
    <Card className={styles.forecastWrapper}>
      <Row>
        <p>Forecast</p>
      </Row>
      <Row wrap={false} className={styles.forecastLine}>
        {forecastItems}
      </Row>
    </Card>
  );
};

import { Card, Col, Row, Skeleton, Tooltip } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { FC } from "react";

import { useGetCurrentWeatherQuery } from "@/gql";

import styles from "./styles.module.scss";
import sunny from "@/assets/sunny.svg";

interface ICurrentWeatherProps {
  cityName: string;
}

export const CurrentWeather: FC<ICurrentWeatherProps> = ({ cityName }) => {
  const { data, loading, error } = useGetCurrentWeatherQuery({
    variables: { cityName },
  });

  console.log(error?.message);
  if (loading) {
    return <Skeleton />;
  }

  if (!data?.currentWeather) {
    return null;
  }
  
  const weather = data.currentWeather.weather;

  return (
    <Card className={styles.currentWeather}>
      <Row justify={"space-between"}>
        <Col span={14}>
          <div className={styles.cityName}>
            <p>{cityName}</p>
            <Tooltip title="Add city to cards" placement="right">
              <PlusCircleOutlined className={styles.plus} />
            </Tooltip>
          </div>
          <p className={styles.temp}>
            {Math.round(weather.temperature)}
            <span className={styles.tempSymbol}>°</span>
          </p>
          <p className={styles.addInfo}>
            {Math.round(weather.maxTemperature)}°/
            {Math.round(weather.minTemperature)}° Feels like{" "}
            {Math.round(weather.feelsLike)}°
          </p>
        </Col>
        <Col span={8} className={styles.iconBlock}>
          <img
            src={sunny}
            alt="sunny"
            className={`${styles.weatherIcon} rotate`}
          />
          <p
            className={styles.weatherDescription}
          >{`${weather.weather}, ${weather.weatherDescription}`}</p>
        </Col>
      </Row>
    </Card>
  );
};

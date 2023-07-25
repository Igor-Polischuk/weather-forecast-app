import { Card } from "antd";
import { FC } from "react";

interface IWeatherMessage {
  text: string
}

export const WeatherMessage: FC<IWeatherMessage> = ({text}) => {
  return (
    <Card>
      <h3>{text}</h3>
    </Card>
  );
};

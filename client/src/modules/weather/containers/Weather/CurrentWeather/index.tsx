import { Skeleton } from "antd";
import { FC } from "react";

import { CurrentWeatherMainInfo } from "@/modules/weather/components/CurrentWeatherMainInfo";
import { useGetCurrentWeatherQuery } from "@/gql";

interface ICurrentWeatherProps {
  cityName: string;
}

export const CurrentWeather: FC<ICurrentWeatherProps> = ({ cityName }) => {
  const { data, loading } = useGetCurrentWeatherQuery({
    variables: { cityName },
  });

  if (loading) {
    return <Skeleton />;
  }

  if (!data?.currentWeather) {
    return null;
  }

  const {
    temperature,
    feelsLike,
    icon,
    weatherDescription,
    weatherCondition,
  } = data.currentWeather.weather;

  return (
    <CurrentWeatherMainInfo
      city={cityName}
      feelsLike={feelsLike}
      icon={icon}
      temperature={temperature}
      weatherDesc={weatherDescription}
      weatherMain={weatherCondition}
    />
  );
};

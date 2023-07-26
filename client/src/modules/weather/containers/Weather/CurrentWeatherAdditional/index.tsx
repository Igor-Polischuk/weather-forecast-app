import { Skeleton } from "antd";
import { FC } from "react";

import { useGetCurrentWeatherQuery } from "@/gql";
import { AdditionalWeatherInfo } from "@/modules/weather/components/AdditionalWeatherInfo";

interface ICurrentAdditionalProps {
  cityName: string;
}

export const CurrentWeatherAdditional: FC<ICurrentAdditionalProps> = ({
  cityName,
}) => {
  const { data, loading } = useGetCurrentWeatherQuery({
    variables: { cityName },
  });

  if (loading) {
    return <Skeleton />;
  }

  if (!data?.currentWeather) {
    return null;
  }

  const { humidity, pressure, windSpeed } = data.currentWeather.weather;

  return (
    <AdditionalWeatherInfo
      humidity={humidity}
      pressure={pressure}
      windSpeed={windSpeed}
    />
  );
};

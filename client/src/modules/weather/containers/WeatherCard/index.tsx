import { Skeleton } from "antd";
import { FC } from "react";

import { WeatherCardDisplay } from "./WeatherCardDisplay";
import { currentCityVar } from "@/apollo/weather-vars";
import { useGetCurrentWeatherQuery } from "@/gql";
import { useReactiveVar } from "@apollo/client";

interface IWeatherCardProps {
  city: {
    name: string;
    fullname: string;
  };
}

export const SavedCityWeatherCard: FC<IWeatherCardProps> = ({ city }) => {
  const currentCity = useReactiveVar(currentCityVar);
  const { data, loading, error } = useGetCurrentWeatherQuery({
    variables: { cityName: city.fullname },
  });

  if (loading) {
    return <Skeleton />;
  }

  if (error || !data?.currentWeather) {
    return null;
  }

  const weather = data.currentWeather.weather;
  const temperature = Math.round(weather.temperature);

  const onClick = () => {
    currentCityVar(city.fullname);
  };

  return (
    <WeatherCardDisplay
      city={city.fullname}
      icon={weather.icon}
      onCardClick={onClick}
      temperature={temperature}
      weather={weather.weatherDescription}
      active={currentCity === city.fullname}
    />
  );
};

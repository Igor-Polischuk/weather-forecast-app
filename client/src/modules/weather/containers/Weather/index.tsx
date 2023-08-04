import { useReactiveVar } from "@apollo/client";
import { Skeleton, Space } from "antd";


import { CurrentWeatherMainInfo } from "../../components/CurrentWeatherMainInfo";
import { AdditionalWeatherInfo } from "../../components/AdditionalWeatherInfo";
import { useSavedCityWeather } from "../../hooks/useSavedCityWeather";
import { WeatherMessage } from "../../components/WeatherMessage";
import { useWeatherData } from "../../hooks/useWeatherData";
import { currentCityVar } from "@/apollo/weather-vars";
import { Forecast } from "../Forecast";
import { SaveCity } from "../SaveCity";

export const Weather = () => {
  const { weatherInfo } = useSavedCityWeather();
  const cityName = useReactiveVar(currentCityVar);
  const isCitySelected = cityName.trim() !== "";

  if (cityName === "" && weatherInfo.length > 0) {
    currentCityVar(weatherInfo[0].city);
  }

  const { data, loading, error } = useWeatherData();
  
  if (loading || !data?.currentWeather) {
    return <Skeleton active />;
  }

  if (!isCitySelected) {
    return <WeatherMessage text="Use the search panel to find weather in your city" />;
  }

  if (error) {
    return <WeatherMessage text={error.message} />;
  }

  const {
    temperature,
    feelsLike,
    icon,
    weatherDescription,
    weatherCondition,
    humidity,
    pressure,
    windSpeed,
  } = data.currentWeather.weather;

  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <CurrentWeatherMainInfo
        city={cityName}
        feelsLike={feelsLike}
        icon={icon}
        temperature={temperature}
        weatherDesc={weatherDescription}
        weatherMain={weatherCondition}
        button={<SaveCity/>}
      />
      <AdditionalWeatherInfo
        humidity={humidity}
        pressure={pressure}
        windSpeed={windSpeed}
      />
      <Forecast cityName={cityName} />
    </Space>
  );
};

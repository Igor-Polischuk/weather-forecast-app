/* eslint-disable prettier/prettier */
import { CurrentWeatherOutput } from "src/weather/dto/output/current-weather.output";
import { Timezone } from "src/weather/dto/timezone";
import { Weather } from "src/weather/dto/weather";

import { ICurrentWeatherApiResponse } from "../interfaces/ICurrentWeatherApiResponse";
import { isDayTime } from "src/external-api/weather-api/helpers/is-day";
import { getWeatherIconUrl } from "src/external-api/weather-api/helpers/get-icon-url";


export function transformCurrentWeatherApiResponse(
  apiResponse: ICurrentWeatherApiResponse,
): CurrentWeatherOutput {
  const { main, weather, sys, timezone, clouds, rain, wind } = apiResponse;
  
  const isDay = isDayTime({
    sunrise: apiResponse.sys.sunrise,
    sunset: apiResponse.sys.sunset,
    now: apiResponse.dt
  });
  
  const iconUrl = getWeatherIconUrl({
    weatherCondition: weather[0].main,
    weatherDescription: weather[0].description,
    isDay
  });

  const mainData: Weather = {
    temperature: main.temp,
    feelsLike: main.feels_like,
    maxTemperature: main.temp_max,
    minTemperature: main.temp_min,
    clouds: clouds.all,
    rainPerHour: rain?.['1h'] || 0,
    pressure: main.pressure,
    humidity: main.humidity,
    weatherCondition: weather[0].main,
    weatherDescription: weather[0].description,
    windSpeed: wind.speed,
    icon: iconUrl
  };

  const timezoneData: Timezone = {
    sunrise: sys.sunrise || 0,
    sunset: sys.sunset || 0,
    timezone: timezone || 0,
  };

  return {
    weather: mainData,
    timezone: timezoneData,
  };
}

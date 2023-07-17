/* eslint-disable prettier/prettier */
import {
  CurrentWeatherOutput,
  Timezone,
} from '../dto/current-weather.output';
import { WeatherMain } from '../entities/weather-main.entity';
import { ICurrentWeatherApiResponse } from '../interfaces/ICurrentWeatherApiResponse';

export function transformCurrentWeatherApiResponse(
  apiResponse: ICurrentWeatherApiResponse,
): CurrentWeatherOutput {
  const { main, weather, sys, timezone, clouds, rain } = apiResponse;

  const mainData: WeatherMain = {
    temperature: main.temp,
    feelsLike: main.feels_like,
    maxTemperature: main.temp_max,
    minTemperature: main.temp_min,
    clouds: clouds.all,
    rainPerHour: rain?.['1h'] || 0,
    pressure: main.pressure,
    humidity: main.humidity,
    current: weather[0].main,
    weatherDescription: weather[0].description,
  };

  const timezoneData: Timezone = {
    sunrise: sys.sunrise || 0,
    sunset: sys.sunset || 0,
    timezone: timezone || 0,
  };

  return {
    main: mainData,
    timezone: timezoneData,
  };
}

/* eslint-disable prettier/prettier */
import { ICoordinate } from './ICoordinates';

export interface ICurrentWeatherApiResponse {
  coord: ICoordinate

  weather: [{
    main: string
    description: string
  }]

  wind: {
    speed: number
    deg: number
    gust: number
  }

  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }

  rain: {
    ["1h"]: number
  }

  clouds: {
    all: number
  }

  dt: number
  sys: {
    country: number
    sunrise: number
    sunset: number
  }

  timezone: number
}

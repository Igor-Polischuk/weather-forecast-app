/* eslint-disable prettier/prettier */
import { ICoordinate } from './ICoordinates';
import { ICurrentWeatherApiResponse } from './ICurrentWeatherApiResponse';

type ForecastWeatherObject = Omit<ICurrentWeatherApiResponse, 'sys' | 'timezone' | 'coord'> & {pop: number}

export interface IForecastApiResponse {
  list: ForecastWeatherObject[];
  city: {
    name: string
    coord: ICoordinate
    population: number
    sunrise: number
    sunset: number
    timezone: number
    country: string
  }
}

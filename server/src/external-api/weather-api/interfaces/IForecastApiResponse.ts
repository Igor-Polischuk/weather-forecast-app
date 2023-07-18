/* eslint-disable prettier/prettier */
import { ICurrentWeatherApiResponse } from './ICurrentWeatherApiResponse';

type ForecastWeatherObject = Omit<ICurrentWeatherApiResponse, 'sys' | 'timezone' | 'coord'> & {pop: number}

export interface IForecastApiResponse {
  list: ForecastWeatherObject[];
}

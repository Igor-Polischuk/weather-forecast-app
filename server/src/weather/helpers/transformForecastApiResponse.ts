/* eslint-disable prettier/prettier */
import { ForecastItem, ForecastOutput } from "../dto/forecast.output";
import { ICurrentWeatherApiResponse } from "../interfaces/ICurrentWeatherApiResponse";
import { IForecastApiResponse } from "../interfaces/IForecastApiResponse";
import { transformCurrentWeatherApiResponse } from "./transformCurrentWeatherApiResponse";

export function transformForecastApiResponse(
  apiResponse: IForecastApiResponse,
): ForecastOutput {
    const { list } = apiResponse;

  const transformedList: ForecastItem[] = list.map((item) => {
    const date = item.dt * 1000;
    const { pop, ...weatherData } = item;
    const {main}= transformCurrentWeatherApiResponse(weatherData as ICurrentWeatherApiResponse);

    return { ...main, pop, date } ; 
  });

  return { items: transformedList };
}

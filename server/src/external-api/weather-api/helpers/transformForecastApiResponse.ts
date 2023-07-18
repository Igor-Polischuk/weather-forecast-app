/* eslint-disable prettier/prettier */
import { ForecastOutput, ForecastItem } from "src/weather/dto/output/forecast.output";
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
    const {weather: main}= transformCurrentWeatherApiResponse(weatherData as ICurrentWeatherApiResponse);

    return { ...main, pop, date } ; 
  });

  return { items: transformedList };
}

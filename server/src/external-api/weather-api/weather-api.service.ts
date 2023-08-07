import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { transformCurrentWeatherApiResponse } from './helpers/transformCurrentWeatherApiResponse';
import { transformForecastApiResponse } from './helpers/transformForecastApiResponse';
import { ICurrentWeatherApiResponse } from './interfaces/ICurrentWeatherApiResponse';
import { CurrentWeatherOutput } from 'src/weather/dto/output/current-weather.output';
import { IForecastApiResponse } from './interfaces/IForecastApiResponse';
import { ForecastOutput } from 'src/weather/dto/output/forecast.output';
import { ICoordinate } from './interfaces/ICoordinates';
import { QueryParams } from 'src/common/utils/query-params/QueryParams';

@Injectable()
export class WeatherApiService {
  private apiKey = process.env.WEATHER_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async getCurrentWeather(
    coord: ICoordinate,
    units: string,
  ): Promise<CurrentWeatherOutput> {
    const query = new QueryParams({
      lat: coord.lat,
      lon: coord.lon,
      units: units,
      appid: this.apiKey,
    });

    const url = `weather?${query.toString()}`;

    try {
      const data =
        await this.httpService.axiosRef.get<ICurrentWeatherApiResponse>(url);
      const weather = data.data;

      return transformCurrentWeatherApiResponse(weather);
    } catch (error) {
      console.log(error);

      throw new ForbiddenException('API not available');
    }
  }

  async getForecast(
    coord: ICoordinate,
    units: string,
  ): Promise<ForecastOutput> {
    const query = new QueryParams({
      lat: coord.lat,
      lon: coord.lon,
      units: units,
      appid: this.apiKey,
    });

    const url = `forecast?${query.toString()}`;

    try {
      const data = await this.httpService.axiosRef.get<IForecastApiResponse>(
        url,
      );

      const forecast = data.data;

      return transformForecastApiResponse(forecast);
    } catch (error) {
      console.log(error);

      throw new ForbiddenException('API not available');
    }
  }
}

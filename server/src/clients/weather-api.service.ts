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
import { MeasurementSystem } from 'src/common/enums/measurement-system';

@Injectable()
export class WeatherApiService {
  private apiKey = process.env.WEATHER_API_KEY;
  private baseUrl = process.env.WEATHER_API_BASE_URL;

  constructor(private readonly httpService: HttpService) {}

  async getCurrentWeather(
    { lat, lon }: ICoordinate,
    units: MeasurementSystem,
  ): Promise<CurrentWeatherOutput> {
    const query = new QueryParams({
      lat,
      lon,
      units,
      appid: this.apiKey,
    });

    const url = `${this.baseUrl}weather?${query.toString()}`;

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
    { lat, lon }: ICoordinate,
    units: MeasurementSystem,
  ): Promise<ForecastOutput> {
    const query = new QueryParams({
      lat,
      lon,
      units,
      appid: this.apiKey,
    });

    const url = `${this.baseUrl}forecast?${query.toString()}`;

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

import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { transformCurrentWeatherApiResponse } from './helpers/transformCurrentWeatherApiResponse';
import { transformForecastApiResponse } from './helpers/transformForecastApiResponse';
import { ICurrentWeatherApiResponse } from './interfaces/ICurrentWeatherApiResponse';
import { CurrentWeatherOutput } from 'src/weather/dto/output/current-weather.output';
import { IForecastApiResponse } from './interfaces/IForecastApiResponse';
import { ForecastOutput } from 'src/weather/dto/output/forecast.output';
import { ICoordinate } from './interfaces/ICoordinates';

enum Endpoint {
  Forecast = 'forecast',
  Weather = 'weather',
}

@Injectable()
export class WeatherApiService {
  constructor(private readonly httpService: HttpService) {}

  async getCurrentWeather(
    coord: ICoordinate,
    units: string,
  ): Promise<CurrentWeatherOutput> {
    const url = this.generateUrl(coord, Endpoint.Weather, units);

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
    const url = this.generateUrl(coord, Endpoint.Forecast, units);

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

  private generateUrl(
    coord: ICoordinate,
    endpoint: Endpoint,
    units: string,
  ): string {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `${endpoint}?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=${units}`;
    return url;
  }
}

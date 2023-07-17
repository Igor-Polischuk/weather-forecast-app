import { Coordinate } from './dto/coordinate.input';
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ICurrentWeatherApiResponse } from './interfaces/ICurrentWeatherApiResponse';
import { ICoordinate } from './interfaces/ICoordinates';
import { transformCurrentWeatherApiResponse } from './helpers/transformCurrentWeatherApiResponse';
import { CurrentWeatherOutput } from './dto/current-weather.output';
import { IForecastApiResponse } from './interfaces/IForecastApiResponse';
import { transformForecastApiResponse } from './helpers/transformForecastApiResponse';

enum Endpoint {
  Forecast = 'forecast',
  Weather = 'weather',
}

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getCurrentWeather(coord: ICoordinate): Promise<CurrentWeatherOutput> {
    const url = this.generateUrl(coord, Endpoint.Weather);

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

  async getForecast(coord: ICoordinate) {
    const url = this.generateUrl(coord, Endpoint.Forecast);

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

  private generateUrl(coord: Coordinate, endpoint: Endpoint): string {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `${endpoint}?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
    return url;
  }
}

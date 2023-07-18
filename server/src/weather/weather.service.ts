import { Injectable } from '@nestjs/common';
import { WeatherApiService } from 'src/external-api/weather-api/weather-api.service';
import { ICoordinate } from './interfaces/ICoordinates';

@Injectable()
export class WeatherService {
  constructor(private readonly weatherApiService: WeatherApiService) {}

  getCurrentWeather(coord: ICoordinate, unit: string) {
    // const coordinate = cityService.getCoordinate(cityName)
    return this.weatherApiService.getCurrentWeather(coord, unit);
  }

  getForecast(coord: ICoordinate, unit: string) {
    // const coordinate = cityService.getCoordinate(cityName)
    return this.weatherApiService.getForecast(coord, unit);
  }
}

import { Injectable } from '@nestjs/common';

import { WeatherApiService } from 'src/external-api/weather-api/weather-api.service';
import { CityService } from './../city/city.service';

@Injectable()
export class WeatherService {
  constructor(
    private readonly weatherApiService: WeatherApiService,
    private readonly cityService: CityService,
  ) {}

  async getCurrentWeather(city: string, unit: string) {
    const coordinate = await this.cityService.getCityCoordinate(city);
    return this.weatherApiService.getCurrentWeather(coordinate, unit);
  }

  async getForecast(city: string, unit: string) {
    const coordinate = await this.cityService.getCityCoordinate(city);
    return this.weatherApiService.getForecast(coordinate, unit);
  }
}

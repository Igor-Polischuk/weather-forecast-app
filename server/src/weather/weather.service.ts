import { Injectable } from '@nestjs/common';

import { CurrentWeatherOutput } from './dto/output/current-weather.output';
import { WeatherApiService } from 'src/clients/weather-api.service';
import { ForecastOutput } from './dto/output/forecast.output';
import { CityService } from './../city/city.service';

@Injectable()
export class WeatherService {
  constructor(
    private readonly weatherApiService: WeatherApiService,
    private readonly cityService: CityService,
  ) {}

  async getCurrentWeather(
    city: string,
    unit: string,
  ): Promise<CurrentWeatherOutput> {
    const coordinate = await this.cityService.getCityCoordinate(city);
    return this.weatherApiService.getCurrentWeather(coordinate, unit);
  }

  async getForecast(city: string, unit: string): Promise<ForecastOutput> {
    const coordinate = await this.cityService.getCityCoordinate(city);
    return this.weatherApiService.getForecast(coordinate, unit);
  }
}

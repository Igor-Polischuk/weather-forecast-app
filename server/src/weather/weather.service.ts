import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';

import { WeatherApiService } from 'src/external-api/weather-api/weather-api.service';
import { CurrentWeatherOutput } from './dto/output/current-weather.output';
import { CityService } from './../city/city.service';

@Injectable()
export class WeatherService {
  constructor(
    private readonly weatherApiService: WeatherApiService,
    private readonly cityService: CityService,
    private readonly usersService: UsersService,
  ) {}

  async getCurrentWeather(
    city: string,
    unit: string,
  ): Promise<CurrentWeatherOutput> {
    const coordinate = await this.cityService.getCityCoordinate(city);
    return this.weatherApiService.getCurrentWeather(coordinate, unit);
  }

  async getForecast(city: string, unit: string) {
    const coordinate = await this.cityService.getCityCoordinate(city);
    return this.weatherApiService.getForecast(coordinate, unit);
  }
}

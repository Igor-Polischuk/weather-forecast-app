import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';

import { WeatherApiService } from 'src/external-api/weather-api/weather-api.service';
import { CitiesCurrentWeatherOutput } from './dto/output/cities-current-weather';
import { CurrentWeatherOutput } from './dto/output/current-weather.output';
import { CityService } from './../city/city.service';
import { IUser } from 'src/users/dto/User';

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

  async getCurrentWeatherInUserCities(
    user: IUser,
  ): Promise<CitiesCurrentWeatherOutput[]> {
    const userInDb = await this.usersService.findOne(user.id);

    const weatherPromises = userInDb.cities.map(async (city) => {
      const weather = await this.weatherApiService.getCurrentWeather(
        {
          lat: city.lat,
          lon: city.lon,
        },
        'metric',
      );

      return { ...weather, city: city };
    });

    const weatherList = await Promise.all(weatherPromises);

    return weatherList;
  }
}

import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CurrentWeatherOutput } from './dto/output/current-weather.output';
import { CurrentUser } from 'src/users/decorators/CurrentUser';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ForecastOutput } from './dto/output/forecast.output';
import { WeatherInput } from './dto/input/weather.input';
import { WeatherService } from './weather.service';
import { IUser } from 'src/users/dto/User';
import { CitiesCurrentWeatherOutput } from './dto/output/cities-current-weather';

@Resolver()
@UseGuards(JwtAuthGuard)
export class WeatherResolver {
  constructor(private readonly weatherService: WeatherService) {}

  @Query(() => CurrentWeatherOutput)
  currentWeather(@Args('WeatherInput') weatherInput: WeatherInput) {
    return this.weatherService.getCurrentWeather(
      weatherInput.city,
      weatherInput.units,
    );
  }

  @Query(() => ForecastOutput)
  forecast(@Args('WeatherInput') weatherInput: WeatherInput) {
    return this.weatherService.getForecast(
      weatherInput.city,
      weatherInput.units,
    );
  }

  @Query(() => [CitiesCurrentWeatherOutput])
  getCurrentWeatherInUserCities(@CurrentUser() user: IUser) {
    return this.weatherService.getCurrentWeatherInUserCities(user);
  }
}

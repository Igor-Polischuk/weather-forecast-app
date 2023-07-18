import { Args, Query, Resolver } from '@nestjs/graphql';

import { CurrentWeatherOutput } from './dto/output/current-weather.output';
import { ForecastOutput } from './dto/output/forecast.output';
import { WeatherInput } from './dto/input/weather.input';
import { WeatherService } from './weather.service';

@Resolver()
// @UseGuards(JwtAuthGuard)
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
}

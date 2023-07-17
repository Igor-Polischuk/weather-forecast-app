import { Args, Query, Resolver } from '@nestjs/graphql';
import { WeatherService } from './weather.service';
import { Coordinate } from './dto/coordinate.input';
import { CurrentWeatherOutput } from './dto/current-weather.output';
import { ForecastOutput } from './dto/forecast.output';

@Resolver()
// @UseGuards(JwtAuthGuard)
export class WeatherResolver {
  constructor(private readonly weatherService: WeatherService) {}

  @Query(() => CurrentWeatherOutput)
  currentWeather(@Args('Coordinate') coordinate: Coordinate) {
    return this.weatherService.getCurrentWeather(coordinate);
  }

  @Query(() => ForecastOutput)
  forecast(@Args('Coordinate') coordinate: Coordinate) {
    return this.weatherService.getForecast(coordinate);
  }
}

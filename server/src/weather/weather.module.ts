import { Module } from '@nestjs/common';

import { WeatherApiModule } from 'src/external-api/weather-api/weather-api.module';
import { WeatherResolver } from './weather.resolver';
import { WeatherService } from './weather.service';
import { CityModule } from 'src/city/city.module';

@Module({
  imports: [WeatherApiModule, CityModule],
  providers: [WeatherResolver, WeatherService],
})
export class WeatherModule {}

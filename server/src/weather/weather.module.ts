import { Module } from '@nestjs/common';

import { WeatherApiModule } from 'src/external-api/weather-api/weather-api.module';
import { WeatherResolver } from './weather.resolver';
import { WeatherService } from './weather.service';

@Module({
  imports: [WeatherApiModule],
  providers: [WeatherResolver, WeatherService],
})
export class WeatherModule {}

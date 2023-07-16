import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { WeatherService } from './weather.service';
import { WeatherResolver } from './weather.resolver';

@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.WEATHER_API_BASE_URL,
    }),
  ],
  providers: [WeatherResolver, WeatherService],
})
export class WeatherModule {}

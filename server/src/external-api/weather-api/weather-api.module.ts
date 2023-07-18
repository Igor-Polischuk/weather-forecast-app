import { Module } from '@nestjs/common';
import { WeatherApiService } from './weather-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.WEATHER_API_BASE_URL,
    }),
  ],
  exports: [WeatherApiService],
  providers: [WeatherApiService],
})
export class WeatherApiModule {}

import { Module } from '@nestjs/common';
import { WeatherApiService } from './weather-api.service';
import { HttpModule } from '@nestjs/axios';
import { GeoApiService } from './geo-api.service';

@Module({
  imports: [HttpModule],
  exports: [WeatherApiService, GeoApiService],
  providers: [WeatherApiService, GeoApiService],
})
export class ClientsModule {}

import { Module } from '@nestjs/common';

import { ClientsModule } from 'src/clients/clients.module';
import { WeatherResolver } from './weather.resolver';
import { WeatherService } from './weather.service';
import { CityModule } from 'src/city/city.module';

@Module({
  imports: [ClientsModule, CityModule],
  providers: [WeatherResolver, WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}

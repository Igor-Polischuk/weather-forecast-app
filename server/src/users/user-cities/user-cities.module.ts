import { Module } from '@nestjs/common';
import { UserCitiesService } from './user-cities.service';
import { UserCitiesResolver } from './user-cities.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityModule } from 'src/city/city.module';
import { User } from '../entities/user.entity';
import { WeatherModule } from 'src/weather/weather.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CityModule, WeatherModule],
  providers: [UserCitiesResolver, UserCitiesService],
})
export class UserCitiesModule {}

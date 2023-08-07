import { Module } from '@nestjs/common';
import { UserCitiesService } from './user-cities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityModule } from 'src/city/city.module';
import { WeatherModule } from 'src/weather/weather.module';
import { User } from 'src/users/entities/user.entity';
import { UserCitiesResolver } from './user-cities.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CityModule, WeatherModule],
  providers: [UserCitiesResolver, UserCitiesService],
})
export class UserCitiesModule {}

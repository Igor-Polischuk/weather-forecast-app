import { Module } from '@nestjs/common';
import { UserCitiesService } from './user-cities.service';
import { UserCitiesResolver } from './user-cities.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityModule } from 'src/city/city.module';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CityModule],
  providers: [UserCitiesResolver, UserCitiesService],
})
export class UserCitiesModule {}
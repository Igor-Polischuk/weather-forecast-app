import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CityModule } from 'src/city/city.module';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserCitiesModule } from './user-cities/user-cities.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CityModule, UserCitiesModule],
  exports: [UsersService],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}

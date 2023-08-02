import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserCitiesService } from './user-cities.service';
import { CurrentUser } from '../decorators/CurrentUser';
import { City } from 'src/city/entities/city.entity';
import { IUser } from '../dto/User';
import { UserCitiesCurrentWeatherOutput } from './dto/user-cities-weather.output';
import { UserCitiesCurrentWeatherInput } from './dto/user-cities-weather.input';

@Resolver()
@UseGuards(JwtAuthGuard)
export class UserCitiesResolver {
  constructor(private readonly userCitiesService: UserCitiesService) {}

  @Query(() => [City])
  getUserCities(@CurrentUser() user: IUser): Promise<City[]> {
    return this.userCitiesService.getUserCities(user);
  }

  @Query(() => UserCitiesCurrentWeatherOutput)
  getCurrentWeatherInUserCities(
    @Args('UserCitiesCurrentWeatherInput')
    userCitiesCurrentWeatherInput: UserCitiesCurrentWeatherInput,
    @CurrentUser() user: IUser,
  ): Promise<UserCitiesCurrentWeatherOutput> {
    const { page, pageSize: limit } = userCitiesCurrentWeatherInput;
    return this.userCitiesService.getCurrentWeatherInUserCities({
      user,
      page,
      limit,
    });
  }

  @Mutation(() => [City])
  saveCity(
    @Args('city') city: string,
    @CurrentUser() user: IUser,
  ): Promise<City[]> {
    return this.userCitiesService.saveUserCity(user, city);
  }

  @Mutation(() => [City])
  removeCity(
    @Args('city') city: string,
    @CurrentUser() user: IUser,
  ): Promise<City[]> {
    return this.userCitiesService.removeCity(user, city);
  }
}

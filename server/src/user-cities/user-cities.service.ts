import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IGetCurrentWeatherInUserCitiesParams } from './interfaces/current-cities-weather-param';
import { ICreatePaginationReturningType } from 'src/common/utils/pagination/IPagination';
import { createPagination } from 'src/common/utils/pagination/create-pagination';
import { LimitExceededException } from 'src/common/exceptions';
import { WeatherService } from 'src/weather/weather.service';
import { WeatherUnits } from 'src/weather/WeatherUnits';
import { User } from 'src/users/entities/user.entity';
import { City } from 'src/city/entities/city.entity';
import { CityService } from 'src/city/city.service';
import { IUser } from 'src/users/dto/User';

import {
  UserCitiesCurrentWeather,
  UserCitiesCurrentWeatherOutput,
} from './dto/user-cities-weather.output';

@Injectable()
export class UserCitiesService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly cityService: CityService,
    private readonly weatherService: WeatherService,
  ) {}

  async getUserCities(user: IUser): Promise<City[]> {
    const currentUser = await this.findOne(user.id);

    return currentUser.cities;
  }

  async saveUserCity(user: IUser, cityName: string): Promise<City[]> {
    const city = await this.cityService.findOrCreateCity(cityName);
    const currentUser = await this.findOne(user.id);

    await this.validateSavingCity(currentUser, cityName);

    currentUser.cities.push(city);
    await this.usersRepository.save(currentUser);

    return currentUser.cities;
  }

  async removeCity(user: IUser, cityName: string): Promise<City[]> {
    const city = await this.cityService.findSavedCity(cityName);
    const currentUser = await this.findOne(user.id);

    if (!city) {
      throw new NotFoundException(`${cityName} not found`);
    }

    const newCities = currentUser.cities.filter(
      (city) => city.fullname !== cityName,
    );

    currentUser.cities = newCities;
    await this.usersRepository.save(currentUser);

    return newCities;
  }

  async getCurrentWeatherInUserCities(
    params: IGetCurrentWeatherInUserCitiesParams,
  ): Promise<UserCitiesCurrentWeatherOutput> {
    const { data, pageInfo } = await this.getCitiesAtPage(params);
    const weatherInfo = await this.getWeatherInfoForCities(data);
    return { list: weatherInfo, pageInfo };
  }

  private async getWeatherInfoForCities(
    cities: City[],
  ): Promise<UserCitiesCurrentWeather[]> {
    const weatherInfoPromises = cities.map(async (city) => {
      const weatherInCity = await this.weatherService.getCurrentWeather(
        city.fullname,
        WeatherUnits.Metric,
      );

      return { weatherInCity, city };
    });

    return await Promise.all(weatherInfoPromises);
  }

  private async getCitiesAtPage(
    params: IGetCurrentWeatherInUserCitiesParams,
  ): Promise<ICreatePaginationReturningType<City[]>> {
    const userInDb = await this.findOne(params.user.id);
    const paginationData = createPagination({
      data: userInDb.cities,
      page: params.page,
      pageSize: params.pageSize,
    });

    return paginationData;
  }

  private async validateSavingCity(
    currentUser: User,
    cityName: string,
  ): Promise<void> {
    const limit = Number(process.env.SAVED_CITY_LIMIT);

    if (currentUser.cities.length === limit) {
      throw new LimitExceededException(
        `Reached the limit of ${limit} saved cities`,
      );
    }

    const userCity = currentUser.cities.find(
      (city) => city.fullname === cityName,
    );

    if (userCity) {
      throw new ConflictException(`City '${cityName}' already saved`);
    }
  }

  private async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneOrFail({
      where: { id },
      relations: ['cities'],
    });
    return user;
  }
}

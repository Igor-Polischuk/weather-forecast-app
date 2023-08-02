import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IGetCurrentWeatherInUserCitiesParams } from './interfaces/current-cities-weather-param';
import { LimitExceededException } from 'src/common/exceptions';
import { WeatherService } from 'src/weather/weather.service';
import { paginateCities } from './helpers/paginate-cities';
import { WeatherUnits } from 'src/weather/WeatherUnits';
import { City } from 'src/city/entities/city.entity';
import { CityService } from 'src/city/city.service';
import { PageInfo } from 'src/common/dto/page-info';
import { User } from '../entities/user.entity';
import { IUser } from '../dto/User';

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
    const { cities, ...pageInfo } = await this.getCitiesAtPage(params);
    const weatherInfo = await this.getWeatherInfoForCities(cities);
    return { list: weatherInfo, pageInfo };
  }

  private async getWeatherInfoForCities(
    cities: City[],
  ): Promise<UserCitiesCurrentWeather[]> {
    const weatherInfoPromises = cities.map(async (city) => {
      const weather = await this.weatherService.getCurrentWeather(
        city.fullname,
        WeatherUnits.Metric,
      );

      return { weather, city };
    });

    return await Promise.all(weatherInfoPromises);
  }

  private async getCitiesAtPage(
    params: IGetCurrentWeatherInUserCitiesParams,
  ): Promise<PageInfo & { cities: City[] }> {
    const userInDb = await this.findOne(params.user.id);
    const { cities, totalElements, totalPages } = paginateCities(
      userInDb.cities,
      params.page,
      params.limit,
    );

    return {
      cities,
      currentPage: params.page,
      pageSize: params.limit,
      totalPages,
      totalElements,
    };
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

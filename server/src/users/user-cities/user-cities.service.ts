import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityService } from 'src/city/city.service';
import { LimitExceededException } from 'src/common/exceptions';
import { Repository } from 'typeorm';
import { IUser } from '../dto/User';
import { User } from '../entities/user.entity';
import { City } from 'src/city/entities/city.entity';

@Injectable()
export class UserCitiesService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly cityService: CityService,
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

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneOrFail({
      where: { id },
      relations: ['cities'],
    });
    return user;
  }
}

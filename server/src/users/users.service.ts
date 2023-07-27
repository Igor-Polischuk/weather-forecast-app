import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { LimitExceededException } from 'src/common/exceptions';
import { SignUpInput } from '../auth/dto/input/sign-up';
import { CityService } from 'src/city/city.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IUser } from './dto/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly cityService: CityService,
  ) {}

  saveUser(user: SignUpInput): Promise<User> {
    const newUser = this.usersRepository.create({ ...user, cities: [] });
    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['cities'] });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneOrFail({
      where: { id },
      relations: ['cities'],
    });
    return user;
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['cities'],
    });
  }

  async saveUserCity(user: IUser, cityName: string): Promise<User> {
    const city = await this.cityService.findOrCreateCity(cityName);
    const currentUser = await this.findOne(user.id);

    await this.validateSavingCity(currentUser, cityName);

    currentUser.cities.push(city);
    await this.usersRepository.save(currentUser);

    return currentUser;
  }

  async removeCity(user: IUser, cityName: string): Promise<User> {
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

    return currentUser;
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
}

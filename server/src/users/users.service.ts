import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpInput } from '../auth/dto/input/sign-up';
import { IUser } from './dto/User';
import { CityService } from 'src/city/city.service';
import { LimitExceededException } from 'src/common/exceptions';

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

  async validateSavingCity(currentUser: User, cityName: string) {
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

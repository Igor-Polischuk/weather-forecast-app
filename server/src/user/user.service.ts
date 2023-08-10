import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { SignUpInput } from '../auth/dto/input/sign-up';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
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
    });
    return user;
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }
}

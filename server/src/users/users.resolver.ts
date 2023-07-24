import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from './decorators/CurrentUser';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { IUser } from './dto/User';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Query(() => User)
  async currentUser(@CurrentUser() user: IUser): Promise<IUser> {
    return this.usersService.findOne(user.id);
  }

  @Mutation(() => User)
  saveCity(@Args('city') city: string, @CurrentUser() user: IUser) {
    return this.usersService.saveUserCity(user, city);
  }

  @Mutation(() => User)
  removeCity(@Args('city') city: string, @CurrentUser() user: IUser) {
    return this.usersService.removeCity(user, city);
  }
}

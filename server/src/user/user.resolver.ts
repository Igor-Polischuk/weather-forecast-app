import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from './decorators/CurrentUser';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { IUser } from './dto/User';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UserResolver {
  constructor(private usersService: UserService) {}

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
}

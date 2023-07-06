import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { LoginUserInput } from './dto/login-user.input';
import { GglAuthGuard } from './guards/gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { LoginResponse } from './dto/login-response';
import { AuthService } from './auth.service';
import { CreateUserInput } from 'src/users/dto/create-user.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GglAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  signup(@Args('loginUserInput') createUserInput: CreateUserInput) {
    return this.authService.signup(createUserInput);
  }
}

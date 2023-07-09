import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { setRefreshTokenCookie } from './helpers/setRefreshLoginCookie';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { RefreshResponse } from './dto/refresh-response';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { LoginResponse } from './dto/login-response';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginUserInput') _: LoginUserInput, @Context() context) {
    const { refresh_token, ...result } = await this.authService.login(
      context.user,
    );

    setRefreshTokenCookie(context.res, refresh_token);

    return result;
  }

  @Mutation(() => User)
  signup(@Args('loginUserInput') createUserInput: CreateUserInput) {
    return this.authService.signup(createUserInput);
  }

  @Mutation(() => RefreshResponse)
  async refresh(@Context() context) {
    const { refreshToken } = context.req.cookies;
    const data = await this.authService.refresh(refreshToken);

    setRefreshTokenCookie(context.res, data.newRefreshToken);

    return {
      old_token: data.oldRefreshToken,
      user: data.user,
    };
  }
}

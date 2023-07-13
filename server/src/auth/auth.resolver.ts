import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { setRefreshTokenCookie } from './helpers/setRefreshLoginCookie';
import { SignUpInput } from 'src/auth/dto/sign-up.input';
import { RefreshOutput } from './dto/refresh.output';
import { LoginInput } from './dto/login.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { LoginOutput } from './dto/login.output';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginOutput)
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginUserInput') _: LoginInput, @Context() context) {
    const { refreshToken, ...result } = await this.authService.login(
      context.user,
    );

    setRefreshTokenCookie(context.res, refreshToken);

    return result;
  }

  @Mutation(() => User)
  signup(@Args('loginUserInput') signInInput: SignUpInput) {
    return this.authService.signup(signInInput);
  }

  @Mutation(() => RefreshOutput)
  async refresh(@Context() context) {
    const { refreshToken } = context.req.cookies;
    const data = await this.authService.refresh(refreshToken);

    setRefreshTokenCookie(context.res, data.refreshToken);

    return {
      accessToken: data.accessToken,
    };
  }
}

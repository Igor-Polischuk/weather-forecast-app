import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { setRefreshTokenCookie } from './helpers/setRefreshLoginCookie';
import { SignUpInput } from 'src/auth/dto/input/sign-up';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { RefreshOutput } from './dto/output/refresh';
import { LoginOutput } from './dto/output/login';
import { LoginInput } from './dto/input/login';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from 'src/users/decorators/CurrentUser';
import { IUser } from 'src/users/dto/User';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginOutput)
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginInput') _: LoginInput, @Context() context) {
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

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async logout(@Context() context, @CurrentUser() user: IUser) {
    this.authService.logout(user);

    context.res.clearCookie('refreshToken', {
      httpOnly: true,
      maxAge:
        Number.parseFloat(process.env.REFRESH_TOKEN_MAX_AGE) *
        24 *
        60 *
        60 *
        1000,
    });

    return 'Successfully logout';
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

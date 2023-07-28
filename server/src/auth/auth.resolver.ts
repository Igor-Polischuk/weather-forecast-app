import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { SignUpInput } from 'src/auth/dto/input/sign-up';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { LoginOutput } from './dto/output/login';
import { LoginInput } from './dto/input/login';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from 'src/users/decorators/CurrentUser';
import { IUser } from 'src/users/dto/User';
import { clearTokensCookie, setTokensCookie } from './helpers/cookie';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginOutput)
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginInput') _: LoginInput, @Context() context) {
    const { refreshToken, accessToken, ...result } =
      await this.authService.login(context.user);

    setTokensCookie({
      accessToken,
      refreshToken,
      res: context.res,
    });

    return { ...result };
  }

  @Mutation(() => User)
  signup(@Args('loginUserInput') signInInput: SignUpInput) {
    return this.authService.signup(signInInput);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async logout(@Context() context, @CurrentUser() user: IUser) {
    this.authService.logout(user);

    clearTokensCookie(context.res);

    return 'Successfully logout';
  }

  @Mutation(() => String)
  async refresh(@Context() context) {
    const { refreshToken } = context.req.cookies;
    const newTokens = await this.authService.refresh(refreshToken);

    setTokensCookie({
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken,
      res: context.res,
    });

    return 'Token was updated';
  }
}

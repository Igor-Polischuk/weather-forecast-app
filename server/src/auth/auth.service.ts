import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private refreshTokenStrategy: RefreshTokenStrategy,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOneByEmail(email);
    const errorMessage = 'Invalid email or password';

    if (!user) {
      throw new UnauthorizedException(errorMessage);
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new UnauthorizedException(errorMessage);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }

  async login(user: User) {
    const { accessToken, refreshToken } = await this.generateTokens(user);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user,
    };
  }

  async refresh(oldRefreshToken: string) {
    if (!oldRefreshToken) {
      throw new UnauthorizedException();
    }

    const decoded = await this.refreshTokenStrategy.validateRefreshToken(
      oldRefreshToken,
    );
    const tokenFromDb = await this.refreshTokenStrategy.findRefreshToken(
      oldRefreshToken,
    );

    if (!decoded || !tokenFromDb) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findOne(decoded.id);

    const { accessToken, refreshToken } = await this.generateTokens(user);

    return {
      oldRefreshToken,
      newRefreshToken: refreshToken,
      newAccessToken: accessToken,
      user,
    };
  }

  async signup(createUserInput: CreateUserInput) {
    const user = await this.usersService.findOneByEmail(createUserInput.email);

    if (user) {
      throw new Error('User already exist');
    }

    const password = await bcrypt.hash(createUserInput.password, 10);

    return this.usersService.createUser({ ...createUserInput, password });
  }

  private async generateTokens(user: { email: string; id: number }) {
    const accessToken = this.jwtService.sign({
      email: user.email,
      sub: user.id,
    });

    const refreshToken = await this.refreshTokenStrategy.generateAndSaveToken({
      id: user.id,
      email: user.email,
    });

    return {
      refreshToken,
      accessToken,
    };
  }
}

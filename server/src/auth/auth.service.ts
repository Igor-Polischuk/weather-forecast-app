import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { LoginResponse } from './interfaces/IAuthReturning';
import { SignUpInput } from 'src/auth/dto/input/sign-up';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { IUser, UserDto } from 'src/users/dto/User';
import { ITokens } from './interfaces/ITokens';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private refreshTokenStrategy: RefreshTokenStrategy,
  ) {}

  async authenticateUser(
    email: string,
    password: string,
  ): Promise<UserDto | null> {
    const user = await this.usersService.findOneByEmail(email);
    const errorMessage = 'Invalid email or password';

    if (!user) {
      throw new UnauthorizedException(errorMessage);
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new UnauthorizedException(errorMessage);
    }

    return new UserDto(user);
  }

  async login(user: User): Promise<LoginResponse> {
    const { accessToken, refreshToken } = await this.generateTokens(user);
    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async refresh(oldRefreshToken: string): Promise<ITokens> {
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
      refreshToken,
      accessToken,
    };
  }

  async signup(createUserInput: SignUpInput): Promise<User> {
    const user = await this.usersService.findOneByEmail(createUserInput.email);

    if (user) {
      throw new Error('User already exist');
    }

    const password = await bcrypt.hash(
      createUserInput.password,
      Number(process.env.B_SALT),
    );

    return this.usersService.saveUser({ ...createUserInput, password });
  }

  logout(user: IUser) {
    this.refreshTokenStrategy.clearRefreshToken(user);
  }

  private async generateTokens(user: IUser): Promise<ITokens> {
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

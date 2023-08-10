/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import { RefreshToken } from '../entities/refresh-token.entity';
import { IUser } from 'src/users/dto/User';

@Injectable()
export class RefreshTokenStrategy {
  private readonly refreshTokenSecret: string;
  private readonly refreshTokenLive: string;

  constructor( @InjectRepository(RefreshToken) private tokenRepository: Repository<RefreshToken>) {
    this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    this.refreshTokenLive = process.env.REFRESH_TOKEN_MAX_AGE;
  }

  async generateRefreshToken(user: IUser): Promise<string> {
    const refreshToken = jwt.sign(user, this.refreshTokenSecret, {expiresIn: this.refreshTokenLive});
    return refreshToken;
  }

  async saveRefreshToken(user: IUser, token: string): Promise<string>{
    await this.tokenRepository.upsert({user, refreshToken: token}, ['user'])

    return token;
  }

  async findRefreshToken(refreshToken: string): Promise<RefreshToken | null> {
    return this.tokenRepository.findOne({where: { refreshToken }})
  }

  async validateRefreshToken(refreshToken: string): Promise<IUser> {
    try {
        const decoded = jwt.verify(refreshToken, this.refreshTokenSecret);
        return decoded as {email: string, id: number};
    } catch {
        throw new UnauthorizedException('Invalid token');
    }
  }

  async clearRefreshToken(user: IUser): Promise<void> {
    const tokenData = await this.tokenRepository.findOne({where: { user: {id: user.id} }});

    if (!tokenData) {
      throw new UnauthorizedException('Token doesn`t exist')
    }

    await this.tokenRepository.remove(tokenData);
  }
}

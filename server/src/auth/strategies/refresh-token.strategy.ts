/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import { RefreshToken } from '../entities/refresh-token.entity';

@Injectable()
export class RefreshTokenStrategy {
  private readonly refreshTokenSecret: string;
  private readonly refreshTokenLive: string;

  constructor( @InjectRepository(RefreshToken) private tokenRepository: Repository<RefreshToken>) {
    this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    this.refreshTokenLive = process.env.REFRESH_TOKEN_MAX_AGE;
  }

  async generateRefreshToken(user: {email: string, id: number}): Promise<string> {
    const refreshToken = jwt.sign(user, this.refreshTokenSecret, {expiresIn: this.refreshTokenLive});
    return refreshToken;
  }

  async saveRefreshToken(user: {email: string, id: number}, token: string): Promise<RefreshToken>{
    const tokenData = await this.tokenRepository.findOne({where: { user: {id: user.id} }});

    if (tokenData){
        tokenData.refreshToken = token;
        return this.tokenRepository.save(tokenData);
    }

    const newToken = this.tokenRepository.create({user, refreshToken: token});
    this.tokenRepository.save(newToken);
  }

  async findRefreshToken(refreshToken: string): Promise<RefreshToken | null> {
    return this.tokenRepository.findOne({where: { refreshToken }})
  }

  async validateRefreshToken(refreshToken: string): Promise<{email: string, id: number}> {
    try {
        const decoded = jwt.verify(refreshToken, this.refreshTokenSecret);
        return decoded as {email: string, id: number};
    } catch {
        throw new UnauthorizedException('Invalid token');
    }
  }

  async generateAndSaveToken(user: {email: string, id: number}): Promise<string>{
    const refresh_token = await this.generateRefreshToken(user);
    return (await this.saveRefreshToken(user, refresh_token)).refreshToken;
  }
}

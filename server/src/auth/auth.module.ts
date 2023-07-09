import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { RefreshToken } from './entities/refresh-token.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    ConfigModule.forRoot(),
    PassportModule,
    UsersModule,
    JwtModule.register({
      signOptions: { expiresIn: '30m' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}

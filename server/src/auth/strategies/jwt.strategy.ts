/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from '../helpers/ExtractJwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
        jwtFromRequest: ExtractJwt.fromAuthCookie(),
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET,
        logging: true
    });
  }

  async validate(payload: {sub: string, email: string}){
    return {id: payload.sub, email: payload.email}
  }
}

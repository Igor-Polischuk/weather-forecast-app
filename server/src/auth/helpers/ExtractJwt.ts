/* eslint-disable prettier/prettier */
import { Request } from 'express';
import { JwtFromRequestFunction } from 'passport-jwt';

export class ExtractJwt {
  static fromAuthCookie(): JwtFromRequestFunction {
    return (req: Request) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['accessToken'];
      }
      return token;
    };
  }
}

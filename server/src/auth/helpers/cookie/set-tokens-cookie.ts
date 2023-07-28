/* eslint-disable prettier/prettier */
import { TokenCookieName } from './token-cookie-name';
import { Response } from 'express';

interface ISetTokensCookieParams {
    res: Response
    refreshToken: string
    accessToken: string
  }
  
  export function setTokensCookie(params: ISetTokensCookieParams): void {
    params.res.cookie(TokenCookieName.RefreshToken, params.refreshToken, {
      httpOnly: true,
      maxAge:
        Number.parseFloat(process.env.REFRESH_TOKEN_MAX_AGE) *
        24 *
        60 *
        60 *
        1000,
    });
  
    params.res.cookie(TokenCookieName.AccessToken, params.accessToken, {
      httpOnly: true,
      maxAge:
        Number.parseFloat(process.env.ACCESS_TOKEN_MAX_AGE) *
        60 * 1000
    });
  }
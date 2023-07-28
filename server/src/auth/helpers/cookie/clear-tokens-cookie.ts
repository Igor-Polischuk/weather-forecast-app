/* eslint-disable prettier/prettier */
import { TokenCookieName } from "./token-cookie-name";
import { Response } from 'express';

export function clearTokensCookie(res: Response): void {
  res.clearCookie(TokenCookieName.RefreshToken, {
    httpOnly: true,
    maxAge:
      Number.parseFloat(process.env.REFRESH_TOKEN_MAX_AGE) *
      24 *
      60 *
      60 *
      1000,
  });

  res.clearCookie(TokenCookieName.AccessToken, {
    httpOnly: true,
    maxAge: Number.parseFloat(process.env.ACCESS_TOKEN_MAX_AGE) * 60 * 1000,
  });
}

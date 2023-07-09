/* eslint-disable prettier/prettier */
import { Response } from 'express';

export function setRefreshTokenCookie(
  res: Response,
  refresh_token: string,
): void {
  res.cookie('refreshToken', refresh_token, {
    httpOnly: true,
    maxAge:
      Number.parseFloat(process.env.REFRESH_TOKEN_MAX_AGE) *
      24 *
      60 *
      60 *
      1000,
  });
}

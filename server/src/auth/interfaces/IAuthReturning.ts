/* eslint-disable prettier/prettier */
import { User } from "src/user/entities/user.entity";

export interface LoginResponse  {
  accessToken: string;
  refreshToken: string;
  user: User;
}

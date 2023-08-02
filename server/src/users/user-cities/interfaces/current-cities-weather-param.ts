/* eslint-disable prettier/prettier */
import { IUser } from "src/users/dto/User";

export interface IGetCurrentWeatherInUserCitiesParams {
  user: IUser;
  page: number;
  limit: number;
}

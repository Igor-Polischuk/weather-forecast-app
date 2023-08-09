/* eslint-disable prettier/prettier */
import { MeasurementSystem } from "src/common/enums/measurement-system";
import { IUser } from "src/users/dto/User";

export interface IGetCurrentWeatherInUserCitiesParams {
  user: IUser;
  page: number;
  pageSize: number;
  units: MeasurementSystem
}

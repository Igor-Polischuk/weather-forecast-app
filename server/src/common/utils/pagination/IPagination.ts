/* eslint-disable prettier/prettier */
import { PageInfo } from 'src/common/dto/page-info';

export interface ICreatePaginationParams<DataType> {
  page: number;
  pageSize: number;
  data: DataType;
}

export interface ICreatePaginationReturningType<DataType> {
  data: DataType;
  pageInfo: PageInfo;
}

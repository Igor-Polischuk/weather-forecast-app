/* eslint-disable prettier/prettier */
import { ICreatePaginationParams, ICreatePaginationReturningType } from "./IPagination";

export function createPagination<DataType>(
  {data, page, pageSize}: ICreatePaginationParams<DataType[]>,
): ICreatePaginationReturningType<DataType[]>{
    const leftBorder = page * pageSize - pageSize;
    const rightBorder = page * pageSize;
    const totalElements = data.length;
    const totalPages = Math.ceil(totalElements / pageSize);
    const dataOnPage = data.slice(leftBorder, rightBorder);

    return {
        data: dataOnPage,
        pageInfo: {
            currentPage: page,
            pageSize,
            totalElements,
            totalPages
        }
      };
  
}

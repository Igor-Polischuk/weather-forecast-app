/* eslint-disable prettier/prettier */
import { City } from "src/city/entities/city.entity";

export function paginateCities(
  cities: City[],
  page: number,
  limit: number,
): {
  cities: City[];
  totalElements: number;
  totalPages: number;
} {
  const leftBorder = page * limit - limit;
  const rightBorder = page * limit;
  const totalElements = cities.length;
  const totalPages = Math.ceil(totalElements / limit);
  const citiesOnPage = cities.slice(leftBorder, rightBorder);

  return {
    cities: citiesOnPage,
    totalElements,
    totalPages,
  };
}

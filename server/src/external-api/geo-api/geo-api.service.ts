import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { CitiesNameOutput } from 'src/city/dto/output/cities-names';
import { GeoApiResponse } from './interfaces/IGeoApiResponse';

@Injectable()
export class GeoApiService {
  constructor(private readonly httpService: HttpService) {}

  async getCities(cityName: string): Promise<CitiesNameOutput[]> {
    const url = this.getUrl(cityName);

    try {
      const data = await this.httpService.axiosRef.get<GeoApiResponse>(url);
      const citiesList = data.data;
      console.log(citiesList);
      return this.transformCitiesInfo(citiesList);
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('API not available');
    }
  }

  private transformCitiesInfo(cities: GeoApiResponse): CitiesNameOutput[] {
    return cities.map((city) => {
      const state = city.state ? `${city.state},` : '';
      const fullname = `${city.name}, ${state} ${city.country}`;

      return {
        name: city.name,
        fullname,
      };
    });
  }

  private getUrl(cityName: string): string {
    const locationName = encodeURIComponent(cityName.trim());
    return `/direct?q=${locationName}&limit=5&appid=${process.env.GEO_API_KEY}`;
  }
}

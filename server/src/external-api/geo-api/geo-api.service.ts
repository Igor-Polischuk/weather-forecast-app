import { HttpService } from '@nestjs/axios';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CitiesNameOutput } from 'src/city/dto/output/cities-names';
import { GeoApiResponse } from './interfaces/IGeoApiResponse';
import { removeDuplicatesByFullName } from './helpers/remove-duplicates-by-fullname';

@Injectable()
export class GeoApiService {
  constructor(private readonly httpService: HttpService) {}

  async getCities(cityName: string): Promise<CitiesNameOutput[]> {
    const url = this.getUrl(cityName);

    try {
      const data = await this.httpService.axiosRef.get<GeoApiResponse>(url);
      const citiesList = data.data;
      const uniqueCities = removeDuplicatesByFullName(citiesList);

      return this.transformCitiesInfo(uniqueCities);
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('API not available');
    }
  }

  async getCityInfo(cityName: string): Promise<CitiesNameOutput> {
    const city = (await this.getCities(cityName))[0];

    if (!city) {
      throw new NotFoundException(`No info about city: '${cityName}'`);
    }

    return city;
  }

  private transformCitiesInfo(cities: GeoApiResponse): CitiesNameOutput[] {
    return cities.map((city) => {
      const state = city.state ? `${city.state},` : '';
      const fullname = `${city.name}, ${state} ${city.country}`;

      return {
        name: city.name,
        fullname,
        lat: city.lat,
        lon: city.lon,
      };
    });
  }

  private getUrl(cityName: string): string {
    const locationName = encodeURIComponent(cityName.trim());
    return `/direct?q=${locationName}&limit=5&appid=${process.env.GEO_API_KEY}`;
  }
}

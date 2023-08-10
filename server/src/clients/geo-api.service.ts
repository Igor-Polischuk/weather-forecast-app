import { HttpService } from '@nestjs/axios';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CitiesNameOutput } from 'src/city/dto/output/cities-names';
import { GeoApiResponse } from './interfaces/IGeoApiResponse';
import { removeDuplicatesByFullName } from './helpers/remove-duplicates-by-fullname';
import { QueryParams } from 'src/common/utils/query-params/QueryParams';

@Injectable()
export class GeoApiService {
  private appid = process.env.GEO_API_KEY;
  private baseUrl = process.env.GEO_API_BASE_URL;
  private cityLimitApi = 5;

  constructor(private readonly httpService: HttpService) {}

  async getCities(cityName: string): Promise<CitiesNameOutput[]> {
    const query = new QueryParams({
      limit: this.cityLimitApi,
      q: cityName,
      appid: this.appid,
    });

    const url = `${this.baseUrl}/direct?${query.toString()}`;

    try {
      const data = await this.httpService.axiosRef.get<GeoApiResponse>(url);
      const citiesList = data.data;
      const uniqueCities = removeDuplicatesByFullName(citiesList);

      return this.transformCitiesInfo(uniqueCities);
    } catch (error) {
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
}

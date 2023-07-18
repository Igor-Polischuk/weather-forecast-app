import { Injectable } from '@nestjs/common';
import { GeoApiService } from 'src/external-api/geo-api/geo-api.service';
import { CitiesNameOutput } from './dto/output/cities-names';

@Injectable()
export class CityService {
  constructor(private readonly geoApiService: GeoApiService) {}

  getCities(cityName: string): Promise<CitiesNameOutput[]> {
    return this.geoApiService.getCities(cityName);
  }
}

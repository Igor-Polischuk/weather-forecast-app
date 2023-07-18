import { Injectable, NotFoundException } from '@nestjs/common';
import { GeoApiService } from 'src/external-api/geo-api/geo-api.service';
import { CitiesNameOutput } from './dto/output/cities-names';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICoordinate } from './interfaces/ICoordinates';

@Injectable()
export class CityService {
  constructor(
    private readonly geoApiService: GeoApiService,
    @InjectRepository(City) private cityRepository: Repository<City>,
  ) {}

  getCities(cityName: string): Promise<CitiesNameOutput[]> {
    return this.geoApiService.getCities(cityName);
  }

  async getCityCoordinate(cityName: string): Promise<ICoordinate> {
    const cityInDb = await this.cityRepository.findOne({
      where: { fullname: cityName },
    });

    if (cityInDb) {
      return {
        lat: cityInDb.lat,
        lon: cityInDb.lon,
      };
    }

    const city = await this.geoApiService.getCityInfo(cityName);

    if (!city) {
      throw new NotFoundException(`No info about ${cityName}`);
    }

    return {
      lat: city.lat,
      lon: city.lon,
    };
  }
}

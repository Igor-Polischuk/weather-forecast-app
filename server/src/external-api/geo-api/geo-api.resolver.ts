import { Resolver } from '@nestjs/graphql';
import { GeoApiService } from './geo-api.service';

@Resolver()
export class GeoApiResolver {
  constructor(private readonly geoApiService: GeoApiService) {}
}

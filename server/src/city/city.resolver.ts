import { Args, Resolver, Query } from '@nestjs/graphql';
import { CityService } from './city.service';
import { CitiesNameOutput } from './dto/output/cities-names';

@Resolver()
export class CityResolver {
  constructor(private readonly cityService: CityService) {}

  @Query(() => [CitiesNameOutput])
  getCitiesTips(
    @Args('cityName') cityName: string,
  ): Promise<CitiesNameOutput[]> {
    return this.cityService.getCities(cityName);
  }
}

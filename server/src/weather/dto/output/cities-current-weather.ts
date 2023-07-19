/* eslint-disable prettier/prettier */
import { CurrentWeatherOutput } from './current-weather.output';
import { Field, ObjectType } from '@nestjs/graphql';
import { City } from 'src/city/entities/city.entity';

@ObjectType()
export class CitiesCurrentWeatherOutput extends CurrentWeatherOutput {
  @Field()
  city: City;
}

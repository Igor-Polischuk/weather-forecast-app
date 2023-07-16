/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsLatitude, IsLongitude, IsNumber } from 'class-validator';

@InputType()
export class Coordinate {
  @Field()
  @IsNumber()
  @IsLatitude()
  lat: number;

  @Field()
  @IsNumber()
  @IsLongitude()
  lon: number;
}

/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsLatitude, IsLongitude, IsNumber } from 'class-validator';
import { ICoordinate } from '../../interfaces/ICoordinates';

@InputType()
export class Coordinate implements ICoordinate{
  @Field()
  @IsNumber()
  @IsLatitude()
  lat: number;

  @Field()
  @IsNumber()
  @IsLongitude()
  lon: number;
}

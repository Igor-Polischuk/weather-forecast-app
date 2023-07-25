/* eslint-disable prettier/prettier */
import { ObjectType, Field, Float, Int } from '@nestjs/graphql';


@ObjectType()
export class Weather {
  @Field(() => Float)
  temperature: number;

  @Field(() => Float)
  feelsLike: number;

  @Field(() => Float)
  maxTemperature: number;

  @Field(() => Float)
  minTemperature: number;

  @Field(() => Float)
  clouds: number;

  @Field(() => Float)
  rainPerHour: number;

  @Field(() => Int)
  pressure: number;

  @Field(() => Int)
  humidity: number;


  @Field(() => Float)
  windSpeed: number

  @Field()
  weather: string;

  @Field()
  weatherDescription: string;
}

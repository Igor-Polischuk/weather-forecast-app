/* eslint-disable prettier/prettier */
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { WeatherMain } from '../entities/weather-main.entity';

@ObjectType()
export class ForecastItem extends WeatherMain{
    @Field(() => Float)
    pop: number

    @Field(() => Float)
    date: number
}

@ObjectType()
export class ForecastOutput {
    @Field(() => [ForecastItem])
    items: ForecastItem[];
}

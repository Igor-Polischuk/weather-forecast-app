/* eslint-disable prettier/prettier */
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Weather } from '../weather';

@ObjectType()
export class ForecastItem extends Weather{
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

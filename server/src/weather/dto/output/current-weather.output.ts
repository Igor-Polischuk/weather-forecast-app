/* eslint-disable prettier/prettier */
import { ObjectType, Field } from '@nestjs/graphql';
import { Weather } from '../weather';
import { Timezone } from '../timezone';

@ObjectType()
export class CurrentWeatherOutput {
    @Field(() => Weather)
    weather: Weather

    @Field(() => Timezone)
    timezone: Timezone
}

/* eslint-disable prettier/prettier */
import { ObjectType, Field } from '@nestjs/graphql';
import { WeatherMain } from '../entities/weather-main.entity';
import { Timezone } from './timezone';

@ObjectType()
export class CurrentWeatherOutput {
    @Field(() => WeatherMain)
    main: WeatherMain

    @Field(() => Timezone)
    timezone: Timezone
}

export { Timezone };


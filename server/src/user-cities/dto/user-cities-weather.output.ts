/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { City } from 'src/city/entities/city.entity';
import { PageInfo } from 'src/common/dto/page-info';
import { CurrentWeatherOutput } from 'src/weather/dto/output/current-weather.output';

@ObjectType()
export class UserCitiesCurrentWeather {
    @Field(() => City)
    city: City

    @Field(() => CurrentWeatherOutput)
    weatherInCity: CurrentWeatherOutput
}

@ObjectType()
export class UserCitiesCurrentWeatherOutput {
    @Field(() => [UserCitiesCurrentWeather])
    list: UserCitiesCurrentWeather[]

    @Field(() => PageInfo)
    pageInfo: PageInfo
}


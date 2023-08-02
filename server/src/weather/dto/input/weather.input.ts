/* eslint-disable prettier/prettier */
import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { WeatherUnits } from 'src/weather/WeatherUnits';

registerEnumType(WeatherUnits, {
    name: 'WeatherUnits',
  });

@InputType()
export class WeatherInput {
  @Field()
  city: string;

  @Field(() => WeatherUnits, {defaultValue: 'metric'})
  units: WeatherUnits
}

/* eslint-disable prettier/prettier */
import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Coordinate } from './coordinate.input';

enum WeatherUnits {
  Metric = 'metric',
  Standard = 'standard',
  Imperial = 'imperial',
}

registerEnumType(WeatherUnits, {
    name: 'WeatherUnits',
  });

@InputType()
export class WeatherInput {
  @Field()
  coordinate: Coordinate;

  @Field(() => WeatherUnits, {defaultValue: 'metric'})
  units: WeatherUnits
}

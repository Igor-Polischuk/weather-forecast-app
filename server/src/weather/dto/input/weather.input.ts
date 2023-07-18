/* eslint-disable prettier/prettier */
import { Field, InputType, registerEnumType } from '@nestjs/graphql';

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
  city: string;

  @Field(() => WeatherUnits, {defaultValue: 'metric'})
  units: WeatherUnits
}

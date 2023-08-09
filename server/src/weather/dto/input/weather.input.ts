/* eslint-disable prettier/prettier */
import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { MeasurementSystem } from 'src/common/enums/measurement-system';

registerEnumType(MeasurementSystem, {
    name: 'WeatherUnits',
  });

@InputType()
export class WeatherInput {
  @Field()
  city: string;

  @Field(() => MeasurementSystem, {defaultValue: 'metric'})
  units: MeasurementSystem
}

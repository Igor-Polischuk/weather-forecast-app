/* eslint-disable prettier/prettier */
import { Field, Int, InputType, registerEnumType } from "@nestjs/graphql";
import { IsInt, IsNumber, Max, Min } from "class-validator";
import { MeasurementSystem } from "src/common/enums/measurement-system";

registerEnumType(MeasurementSystem, {
  name: 'WeatherUnits',
});

@InputType()
export class UserCitiesCurrentWeatherInput {
  @IsNumber()
  @IsInt()
  @Min(1)
  @Field(() => Int)
  page: number;

  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(10)
  @Field(() => Int)
  pageSize: number;

  @Field(() => MeasurementSystem, { defaultValue: 'metric' })
  units: MeasurementSystem
}

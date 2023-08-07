/* eslint-disable prettier/prettier */
import { Field, Int, InputType } from "@nestjs/graphql";
import { IsInt, IsNumber, Max, Min } from "class-validator";

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
}

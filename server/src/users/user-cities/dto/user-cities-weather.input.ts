/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";
import { IsInt, IsNumber, Max, Min } from "class-validator";

@InputType()
export class UserCitiesCurrentWeatherInput {
  @Field()
  @IsNumber()
  @IsInt()
  @Min(1)
  page: number;

  @Field()
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(10)
  pageSize: number;
}

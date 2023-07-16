/* eslint-disable prettier/prettier */
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Timezone {
  @Field(() => Int)
  sunrise: number;

  @Field(() => Int)
  sunset: number;

  @Field(() => Int)
  timezone: number;
}

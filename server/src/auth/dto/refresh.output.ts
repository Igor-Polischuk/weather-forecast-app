/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RefreshOutput {
  @Field()
  accessToken: string;
}

/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class RefreshResponse {
  @Field()
  old_token: string;

  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}

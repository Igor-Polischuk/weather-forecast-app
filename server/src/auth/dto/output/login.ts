/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class LoginOutput {
  @Field(() => User)
  user: User;
}

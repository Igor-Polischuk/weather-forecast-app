/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, Length } from "class-validator";

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(6)
  password: string;
}

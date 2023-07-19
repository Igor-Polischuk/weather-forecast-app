/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, Length } from "class-validator";

@InputType()
export class SignUpInput {
  @IsEmail()
  @Field()
  email: string;

  @Length(6)
  @Field()
  password: string;
}

/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CitiesNameOutput {
    @Field()
    name: string

    @Field()
    fullname: string
}

/* eslint-disable prettier/prettier */
import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CitiesNameOutput {
    @Field()
    name: string

    @Field()
    fullname: string

    @Field(() => Float)
    lat: number

    @Field(() => Float)
    lon: number
}

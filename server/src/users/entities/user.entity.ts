/* eslint-disable prettier/prettier */
import { ObjectType, Int, Field } from '@nestjs/graphql';
import { RefreshToken } from 'src/auth/entities/refresh-token.entity';
import { BaseEntity } from 'src/database/entities/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
@ObjectType()
export class User extends BaseEntity{
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => RefreshToken, refreshToken => refreshToken.user)
  refreshToken: RefreshToken;
}

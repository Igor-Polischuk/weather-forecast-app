/* eslint-disable prettier/prettier */
import { ObjectType, Int, Field } from '@nestjs/graphql';
import { RefreshToken } from 'src/auth/entities/refresh-token.entity';
import { City } from 'src/city/entities/city.entity';
import { BaseEntity } from 'src/database/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToOne } from 'typeorm';

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

  @ManyToMany(() => City, city => city.users)
  @JoinTable()
  cities: City[];
}

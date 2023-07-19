/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/database/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
@ObjectType()
export class City extends BaseEntity{

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({unique: true})
  fullname: string;

  @Field()
  @Column('float')
  lat: number;

  @Field()
  @Column('float')
  lon: number;

  @ManyToMany(() => User, user => user.cities)
  users: User[];
}


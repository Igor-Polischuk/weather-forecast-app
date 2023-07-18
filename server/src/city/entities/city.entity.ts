/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/database/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class City extends BaseEntity{

  @Column()
  name: string;

  @Column('float')
  lat: number;

  @Column('float')
  lon: number;

  @ManyToMany(() => User, user => user.cities)
  users: User[];
}


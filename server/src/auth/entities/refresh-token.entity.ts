/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/database/entities/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class RefreshToken extends BaseEntity{
  @OneToOne(() => User, user => user.refreshToken)
  @JoinColumn()
  user: User;

  @Column()
  refreshToken: string;
}
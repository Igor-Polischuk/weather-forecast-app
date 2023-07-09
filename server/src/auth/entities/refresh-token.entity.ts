/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, } from 'typeorm';

@Entity()
export class RefreshToken {
  @PrimaryColumn()
  userId: number

  @Column()
  refreshToken: string;

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}
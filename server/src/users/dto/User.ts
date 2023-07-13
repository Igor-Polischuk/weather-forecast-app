/* eslint-disable prettier/prettier */
import { User } from '../entities/user.entity';

export interface IUser {
  email: string
  id: number
}

export class UserDto implements IUser {
    email: string
    id: number

    constructor(user: User) {
        this.email = user.email
        this.id = user.id
    }
}

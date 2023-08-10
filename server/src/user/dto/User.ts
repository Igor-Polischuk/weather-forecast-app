/* eslint-disable prettier/prettier */
import { City } from 'src/city/entities/city.entity';
import { User } from '../entities/user.entity';

export interface IUser {
  email: string
  id: number
}

export class UserDto implements IUser {
    email: string
    id: number
    cities: City[]

    constructor(user: User) {
        this.email = user.email
        this.id = user.id
        this.cities = user.cities
    }
}

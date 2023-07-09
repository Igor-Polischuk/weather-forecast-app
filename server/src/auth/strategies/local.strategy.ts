/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService){
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<Omit<User, "password">>{
    const user = this.authService.validateUser(email, password);

    if(!user){
        throw new UnauthorizedException()
    }

    return user;
  }
}

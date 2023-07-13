/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from '../dto/User';

export const CurrentUser  = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IUser => {
    const user: IUser = ctx.getArgByIndex(2).req.user;
    
    return user 
  },
);

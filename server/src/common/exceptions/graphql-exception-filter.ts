/* eslint-disable prettier/prettier */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlContextType } from '@nestjs/graphql';
import { Response } from 'express';

@Catch()
export class GraphqlExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    const ctx = gqlHost.getType<GqlContextType>();

    if (ctx === 'graphql') {
      const response = gqlHost.getContext().res as Response;
      const status =
        exception instanceof HttpException ? exception.getStatus() : 500;
      const message =
        exception instanceof HttpException
          ? exception.getResponse()
          : 'Internal Server Error';

      response.status(status).json({ message });
    }
  }
}

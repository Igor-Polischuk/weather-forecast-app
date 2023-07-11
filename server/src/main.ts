import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

const PORT = process.env.PORT;
const clientUrl = process.env.CLIENT_URL;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({ credentials: true, origin: clientUrl });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}
bootstrap();

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { GeoApiService } from './geo-api.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      baseURL: process.env.GEO_API_BASE_URL,
    }),
  ],
  exports: [GeoApiService],
  providers: [GeoApiService],
})
export class GeoApiModule {}

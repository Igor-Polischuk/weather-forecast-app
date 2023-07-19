import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { GeoApiService } from './geo-api.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.GEO_API_BASE_URL,
    }),
  ],
  exports: [GeoApiService],
  providers: [GeoApiService],
})
export class GeoApiModule {}

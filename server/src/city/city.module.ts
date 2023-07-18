import { GeoApiModule } from './../external-api/geo-api/geo-api.module';
import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityResolver } from './city.resolver';
import { City } from './entities/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([City]), GeoApiModule],
  exports: [CityService],
  providers: [CityResolver, CityService],
})
export class CityModule {}

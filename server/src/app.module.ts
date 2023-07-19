/* eslint-disable prettier/prettier */
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { join } from 'path';

import { GeoApiModule } from './external-api/geo-api/geo-api.module';
import { DatabaseModule } from './database/database.module';
import { WeatherModule } from './weather/weather.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res })
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    WeatherModule,
    CityModule,
    GeoApiModule,
  ],
})
export class AppModule {}

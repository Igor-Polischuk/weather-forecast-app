/* eslint-disable prettier/prettier */
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ServeStaticModule } from '@nestjs/serve-static';
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
import { UserCitiesModule } from './user-cities/user-cities.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res })
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static',
      exclude: ['/api/(.*)'],
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    WeatherModule,
    CityModule,
    GeoApiModule,
    UserCitiesModule,
  ]
})
export class AppModule {}

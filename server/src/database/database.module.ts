import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CONNECTION from './database.connection';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...CONNECTION,
      synchronize: false,
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, getAuthUsersServiceProvider } from '../api-nest-utils/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { ReportsModule } from '../reports/reports.module';
import { UsersEntity } from '../users/users.entity';
import { ReportsEntity } from '../reports/reports.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [ReportsEntity, UsersEntity],
      synchronize: true,
    }),
    AuthModule.register(UsersModule, getAuthUsersServiceProvider(UsersService)),
    ReportsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

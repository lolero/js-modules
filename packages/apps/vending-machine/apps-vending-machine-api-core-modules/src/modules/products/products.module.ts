import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsEntity } from './products.entity';
import { ProductsService } from './products.service';
import { UsersEntity } from '../users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity]),
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}

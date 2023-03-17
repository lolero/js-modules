import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  EntityUniqueKeyValue,
  InterceptorSerialize,
} from '@js-modules/api-nest-utils';
import { AuthDecoratorUsersEntityCurrent } from '@js-modules/api-nest-module-auth-keycloak';
import { Public, Roles } from 'nest-keycloak-connect';
import { ProductsService } from './products.service';
import { ProductsEntity } from './products.entity';
import { ProductsUniqueKeyName } from './products.types';
import { ProductsDtoPublic } from './products.dto.public';
import { ProductsDtoCreateOne } from './products.dto.createOne';
import { ProductsDtoUpdateOneWhole } from './products.dto.updateOneWhole';
import { UsersEntity } from '../users/users.entity';

@Controller('/products')
@InterceptorSerialize<ProductsEntity>(ProductsDtoPublic)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/hello-world')
  @Public()
  helloWorld() {
    console.log('Products Hello world!');
    return 'Products Hello world!';
  }

  @Post()
  @Roles({ roles: ['realm:realm-role-seller'] })
  createOne(
    @Body() productsDtoCreateOne: ProductsDtoCreateOne,
    @AuthDecoratorUsersEntityCurrent() usersEntityCurrent: UsersEntity,
  ): Promise<ProductsEntity> {
    return this.productsService.createOne(
      productsDtoCreateOne,
      usersEntityCurrent,
    );
  }

  @Get('/my-products')
  @Roles({ roles: ['realm:realm-role-seller'] })
  findUsersProducts(
    @AuthDecoratorUsersEntityCurrent() usersEntityCurrent: UsersEntity,
  ) {
    return usersEntityCurrent.products;
  }

  @Get('/:uniqueKeyValue')
  findOne(
    @Param('uniqueKeyValue') uniqueKeyValue: EntityUniqueKeyValue,
    @Query('uniqueKeyName') uniqueKeyName: ProductsUniqueKeyName = 'id',
  ): Promise<ProductsEntity | null> {
    return this.productsService.findOne(uniqueKeyName, uniqueKeyValue);
  }

  @Get()
  findMany() {
    return this.productsService.findMany();
  }

  @Put()
  @Roles({ roles: ['realm:realm-role-seller'] })
  updateOneWhole(
    @Body() productsDtoUpdateOneWhole: ProductsDtoUpdateOneWhole,
    @AuthDecoratorUsersEntityCurrent() usersEntityCurrent: UsersEntity,
  ): Promise<ProductsEntity> {
    return this.productsService.updateOneWhole(
      productsDtoUpdateOneWhole,
      usersEntityCurrent,
    );
  }

  @Delete('/:id')
  @Roles({ roles: ['realm:realm-role-seller'] })
  deleteOne(
    @Param('id') id: number,
    @AuthDecoratorUsersEntityCurrent() usersEntityCurrent: UsersEntity,
  ): Promise<ProductsEntity> {
    return this.productsService.deleteOne(id, usersEntityCurrent);
  }
}

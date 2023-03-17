import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthDecoratorUsersEntityCurrent } from '@js-modules/api-nest-module-auth-keycloak';
import { Public, Roles } from 'nest-keycloak-connect';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { PurchaseChange } from './users.types';
import { UsersDtoDeposit } from './users.dto.deposit';
import { ProductsEntity } from '../products/products.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/hello-world')
  @Public()
  helloWorld() {
    console.log('Users Hello world!');
    return 'Users Hello world!';
  }

  @Get('/my-balance')
  @Roles({ roles: ['realm:realm-role-user'] })
  myBalance(
    @AuthDecoratorUsersEntityCurrent()
    usersEntityCurrent: UsersEntity,
  ): number {
    return usersEntityCurrent.balance;
  }

  @Post('/deposit')
  @Roles({ roles: ['realm:realm-role-buyer'] })
  deposit(
    @Body() usersDtoDeposit: UsersDtoDeposit,
    @AuthDecoratorUsersEntityCurrent()
    usersEntityCurrent: UsersEntity,
  ): Promise<{
    balance: UsersEntity['balance'];
  }> {
    return this.usersService.deposit(
      usersDtoDeposit.amount,
      usersEntityCurrent,
    );
  }

  @Post('/purchase')
  @Roles({ roles: ['realm:realm-role-buyer'] })
  purchase(
    @Body() usersDtoPurchase: any,
    @AuthDecoratorUsersEntityCurrent()
    usersEntityCurrent: UsersEntity,
  ): Promise<{
    products: ProductsEntity[];
    balance: number;
    change: PurchaseChange;
  }> {
    return this.usersService.purchase(usersDtoPurchase, usersEntityCurrent);
  }

  @Post('/reset')
  @Roles({ roles: ['realm:realm-role-buyer'] })
  reset(
    @AuthDecoratorUsersEntityCurrent()
    usersEntityCurrent: UsersEntity,
  ): Promise<{
    balance: number;
    change: PurchaseChange;
  }> {
    return this.usersService.reset(usersEntityCurrent);
  }
}

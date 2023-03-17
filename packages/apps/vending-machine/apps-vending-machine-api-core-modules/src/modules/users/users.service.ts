import { BadRequestException, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUsersService } from '@js-modules/api-nest-module-auth-keycloak';
import { KeycloakTokenParsed } from 'keycloak-js';
import keys from 'lodash/keys';
import keyBy from 'lodash/keyBy';
import uniq from 'lodash/uniq';
import values from 'lodash/values';
import { UsersEntity } from './users.entity';
import { PurchaseChange, UsersEntityType } from './users.types';
import { ProductsEntity } from '../products/products.entity';
import { UsersDtoPurchase } from './users.dto.purchase';
import { usersUtilGetChange } from './users.util.getChange';

@Injectable()
export class UsersService implements AuthUsersService {
  constructor(
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async checkIn(
    keycloakTokenParsed: KeycloakTokenParsed,
  ): Promise<UsersEntity> {
    const usersEntityWithoutId: Omit<
      UsersEntityType,
      'id' | 'balance' | 'createdAt' | 'updatedAt' | 'products'
    > = {
      keycloakId: keycloakTokenParsed.sub!,
      username: keycloakTokenParsed.preferred_username ?? null,
      email: keycloakTokenParsed.sub!,
      firstName: keycloakTokenParsed.given_name ?? null,
      lastName: keycloakTokenParsed.family_name ?? null,
    };

    let usersEntity: UsersEntity | null;

    usersEntity = await this.usersRepository.findOneBy({
      keycloakId: usersEntityWithoutId.keycloakId,
    });

    if (!usersEntity) {
      const userToCreate = {
        ...usersEntityWithoutId,
        balance: 0,
      };
      usersEntity = await this.usersRepository.create(userToCreate);

      usersEntity = await this.usersRepository.save(usersEntity);
      await usersEntity.products;
      return usersEntity;
    }

    let isUsersEntityFieldChanged = false;
    keys(usersEntityWithoutId).forEach((key) => {
      const usersEntityPropKey = key as keyof typeof usersEntityWithoutId;
      if (
        usersEntityWithoutId[usersEntityPropKey] !==
        usersEntity![usersEntityPropKey]
      ) {
        isUsersEntityFieldChanged = true;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        usersEntity[usersEntityPropKey] =
          usersEntityWithoutId[usersEntityPropKey];
      }
    });

    if (isUsersEntityFieldChanged) {
      usersEntity = await this.usersRepository.save(usersEntity);
    }

    await usersEntity.products;
    return usersEntity;
  }

  async deposit(
    amount: number,
    usersEntityCurrent: UsersEntity,
  ): Promise<{
    balance: number;
  }> {
    usersEntityCurrent.balance += amount;

    await this.usersRepository.save(usersEntityCurrent);

    return {
      balance: usersEntityCurrent.balance,
    };
  }

  async purchase(
    usersDtoPurchase: UsersDtoPurchase,
    usersEntityCurrent: UsersEntity,
  ): Promise<{
    products: ProductsEntity[];
    balance: number;
    change: PurchaseChange;
  }> {
    const productIds = keys(usersDtoPurchase.purchases);
    const purchases = values(usersDtoPurchase.purchases);
    const productsEntities = await this.productsRepository.findBy({
      id: In(productIds),
    });

    const productsEntitiesById = keyBy(productsEntities, 'id');
    const totalCost = purchases.reduce((totalTemp, purchase) => {
      const productsEntity = productsEntitiesById[purchase.productId];
      const purchaseCost = productsEntity.cost * purchase.quantity;
      return totalTemp + purchaseCost;
    }, 0);

    if (usersEntityCurrent.balance < totalCost) {
      throw new BadRequestException(
        'The user does not have enough money to make these purchases',
      );
    }

    const totalChange = usersEntityCurrent.balance - totalCost;
    const change = usersUtilGetChange(totalChange);

    usersEntityCurrent.balance = 0;
    const sellerIds = uniq(
      productsEntities.map((productsEntity) => productsEntity.seller.id),
    );
    const sellersEntities = await this.usersRepository.findBy({
      id: In(sellerIds),
    });
    const sellersEntitiesById = keyBy(sellersEntities, 'id');

    purchases.forEach((purchase) => {
      const productsEntity = productsEntitiesById[purchase.productId];
      productsEntity.amountAvailable -= purchase.quantity;
      const sellerEntity = sellersEntitiesById[productsEntity.seller.id];
      sellerEntity.balance += productsEntity.cost * purchase.quantity;
    });

    await this.productsRepository.save(values(productsEntitiesById));
    await this.usersRepository.save(values(sellersEntitiesById));
    await this.usersRepository.save(usersEntityCurrent);

    return {
      products: productsEntities,
      balance: usersEntityCurrent.balance,
      change,
    };
  }

  async reset(usersEntityCurrent: UsersEntity): Promise<{
    balance: number;
    change: PurchaseChange;
  }> {
    const change = usersUtilGetChange(usersEntityCurrent.balance);

    usersEntityCurrent.balance = 0;

    await this.usersRepository.save(usersEntityCurrent);

    return {
      balance: usersEntityCurrent.balance,
      change,
    };
  }
}

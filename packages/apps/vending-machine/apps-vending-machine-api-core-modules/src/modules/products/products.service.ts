import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityUniqueKeyValue } from '@js-modules/api-nest-utils';
import { ProductsEntity } from './products.entity';
import { ProductsUniqueKeyName } from './products.types';
import { UsersEntity } from '../users/users.entity';
import { ProductsDtoCreateOne } from './products.dto.createOne';
import { ProductsDtoUpdateOneWhole } from './products.dto.updateOneWhole';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async createOne(
    productsDtoCreateOne: ProductsDtoCreateOne,
    usersEntityCurrent: UsersEntity,
  ): Promise<ProductsEntity> {
    const productsEntity = this.productsRepository.create(productsDtoCreateOne);

    productsEntity.seller = usersEntityCurrent;

    return this.productsRepository.save(productsEntity);
  }

  async findOne(
    uniqueKeyName: ProductsUniqueKeyName,
    uniqueKeyValue: EntityUniqueKeyValue,
  ): Promise<ProductsEntity | null> {
    const productsEntity = await this.productsRepository.findOneBy({
      [`${uniqueKeyName}`]: uniqueKeyValue,
    });

    return productsEntity;
  }

  async findMany(): Promise<ProductsEntity[]> {
    return this.productsRepository.find();
  }

  async updateOneWhole(
    productsDtoUpdateOneWhole: ProductsDtoUpdateOneWhole,
    usersEntityCurrent: UsersEntity,
  ): Promise<ProductsEntity> {
    const productsEntity = await this.productsRepository.findOneBy({
      id: productsDtoUpdateOneWhole.id,
    });

    if (!productsEntity) {
      throw new BadRequestException(
        `product with id ${productsDtoUpdateOneWhole.id} doesn't exist`,
      );
    }

    if (usersEntityCurrent.id !== productsEntity.seller.id) {
      throw new UnauthorizedException(
        'Only product sellers can update their product',
      );
    }
    if (usersEntityCurrent.id !== productsEntity.seller.id) {
      throw new BadRequestException(
        'It is not possible to change the seller of a product',
      );
    }

    Object.assign(productsEntity, productsDtoUpdateOneWhole);

    return this.productsRepository.save(productsEntity);
  }

  async deleteOne(
    id: ProductsEntity['id'],
    usersEntityCurrent: UsersEntity,
  ): Promise<ProductsEntity> {
    const productsEntity = await this.productsRepository.findOneBy({
      id,
    });

    if (!productsEntity) {
      throw new BadRequestException(`product with id ${id} doesn't exist`);
    }

    if (usersEntityCurrent.id !== productsEntity.seller.id) {
      throw new UnauthorizedException(
        'Only product sellers can delete their product',
      );
    }

    return this.productsRepository.remove(productsEntity);
  }
}

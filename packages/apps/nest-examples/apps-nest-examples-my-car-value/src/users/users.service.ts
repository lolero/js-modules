import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import keys from 'lodash/keys';
import difference from 'lodash/difference';
import {
  AuthUsersService,
  AuthUsersUniqueKeyName,
  AuthUsersUniqueKeyValue,
} from '@js-modules/apps-nest-module-auth';
import { UsersEntity } from './users.entity';
import { UsersDtoCreateOne } from './users.dto.createOne';

@Injectable()
export class UsersService implements AuthUsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async createOne(usersDtoCreateOne: UsersDtoCreateOne): Promise<UsersEntity> {
    const usersEntity = this.usersRepository.create(usersDtoCreateOne);

    return this.usersRepository.save(usersEntity);
  }

  async createMany(): Promise<UsersEntity[]> {
    return [];
  }

  async findOne(
    uniqueKeyName: AuthUsersUniqueKeyName,
    uniqueKeyValue: AuthUsersUniqueKeyValue,
  ): Promise<UsersEntity> {
    const usersEntity = await this.usersRepository.findOneBy({
      [uniqueKeyName]: uniqueKeyValue,
    });

    return usersEntity;
  }

  findMany(email: string): Promise<UsersEntity[]> {
    return this.usersRepository.find({ where: { email } });
  }

  async updateManyPartial(
    partialEntities: Record<
      UsersEntity['id'],
      Partial<Omit<UsersEntity, 'id'>> & { currentPassword?: string }
    >,
  ): Promise<UsersEntity[]> {
    const ids = keys(partialEntities);
    const usersEntities = await this.usersRepository.findBy({
      id: In(ids),
    });

    if (usersEntities.length < ids.length) {
      const foundIds = usersEntities.map((entity) => entity.id);
      const missingIds = difference(ids, foundIds);
      throw new NotFoundException(
        `entities not found. missing ids: ${missingIds.join(', ')}`,
      );
    }

    const usersEntitiesUpdated = usersEntities.map((entity) => {
      return Object.assign(entity, partialEntities[entity.id]);
    });

    return this.usersRepository.save(usersEntitiesUpdated);
  }

  async updateManyPartialWithPattern(
    ids: UsersEntity['id'][],
    partialEntityPattern: Partial<Omit<UsersEntity, 'id'>>,
  ): Promise<UsersEntity[]> {
    const usersEntities = await this.usersRepository.findBy({
      id: In(ids),
    });

    if (usersEntities.length < ids.length) {
      const foundIds = usersEntities.map((entity) => entity.id);
      const missingIds = difference(ids, foundIds);
      throw new NotFoundException(
        `entities not found. missing ids: ${missingIds.join(', ')}`,
      );
    }

    const usersEntitiesUpdated = usersEntities.map((entity) => {
      return Object.assign(entity, partialEntityPattern);
    });

    return this.usersRepository.save(usersEntitiesUpdated);
  }

  async deleteOne(id: UsersEntity['id']): Promise<UsersEntity> {
    const usersEntity = await this.usersRepository.findOneByOrFail({ id });

    if (!usersEntity) {
      throw new NotFoundException('entity not found');
    }

    return this.usersRepository.remove(usersEntity);
  }
}

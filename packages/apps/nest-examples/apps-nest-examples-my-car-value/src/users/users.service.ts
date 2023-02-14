import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import keys from 'lodash/keys';
import difference from 'lodash/difference';
import {
  AuthUsersService,
  UsersUniqueKeyName,
  UsersUniqueKeyValue,
  UserWithoutId,
} from '../api-nest-utils/src';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService implements AuthUsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async createOne(userWithoutId: UserWithoutId): Promise<UsersEntity> {
    const entity = this.usersRepository.create(userWithoutId);

    return this.usersRepository.save(entity);
  }

  async findOne(
    uniqueKeyName: UsersUniqueKeyName,
    uniqueKeyValue: UsersUniqueKeyValue,
  ): Promise<UsersEntity> {
    const entity = await this.usersRepository.findOneBy({
      [uniqueKeyName]: uniqueKeyValue,
    });

    return entity;
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
    const entities = await this.usersRepository.findBy({
      id: In(ids),
    });

    if (entities.length < ids.length) {
      const foundIds = entities.map((entity) => entity.id);
      const missingIds = difference(ids, foundIds);
      throw new NotFoundException(
        `entities not found. missing ids: ${missingIds.join(', ')}`,
      );
    }

    const updatedEntities = entities.map((entity) => {
      return Object.assign(entity, partialEntities[entity.id]);
    });

    return this.usersRepository.save(updatedEntities);
  }

  async updateManyPartialWithPattern(
    ids: UsersEntity['id'][],
    partialEntityPattern: Partial<Omit<UsersEntity, 'id'>>,
  ): Promise<UsersEntity[]> {
    const entities = await this.usersRepository.findBy({
      id: In(ids),
    });

    if (entities.length < ids.length) {
      const foundIds = entities.map((entity) => entity.id);
      const missingIds = difference(ids, foundIds);
      throw new NotFoundException(
        `entities not found. missing ids: ${missingIds.join(', ')}`,
      );
    }

    const updatedEntities = entities.map((entity) => {
      return Object.assign(entity, partialEntityPattern);
    });

    return this.usersRepository.save(updatedEntities);
  }

  async deleteOne(id: UsersEntity['id']): Promise<UsersEntity> {
    const entity = await this.usersRepository.findOneByOrFail({ id });

    if (!entity) {
      throw new NotFoundException('entity not found');
    }

    return this.usersRepository.remove(entity);
  }
}

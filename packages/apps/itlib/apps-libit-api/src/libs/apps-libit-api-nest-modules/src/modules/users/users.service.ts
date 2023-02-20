import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import keys from 'lodash/keys';
import difference from 'lodash/difference';
import upperCase from 'lodash/upperCase';
import {
  AuthUsersService,
  AuthUsersUniqueKeyName,
  AuthUsersUniqueKeyValue,
} from '../../../../api-nest-utils/src';
import { UsersEntity } from './users.entity';
import { UsersDtoCreateOne } from './users.dto.createOne';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';
import { UsersDtoUpdateOnePartialWithPattern } from './users.dto.updateManyPartialWithPattern';
import { UsersDtoDeleteMany } from './users.dto.deleteMany';
import { UsersDtoFindMany } from './users.dto.findMany';
import { UsersDtoUpdateOneWhole } from './users.dto.updateOneWhole';

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

  async findOne(
    uniqueKeyName: AuthUsersUniqueKeyName,
    uniqueKeyValue: AuthUsersUniqueKeyValue,
  ): Promise<UsersEntity> {
    const usersEntity = await this.usersRepository.findOneBy({
      [uniqueKeyName]: uniqueKeyValue,
    });

    return usersEntity;
  }

  findMany(usersDtoFindMany: UsersDtoFindMany): Promise<UsersEntity[]> {
    const query = this.usersRepository.createQueryBuilder().select('*');

    if (usersDtoFindMany.ids) {
      query.where('id = :id', { id: In(usersDtoFindMany.ids) });
    }

    if (usersDtoFindMany.search) {
      query.andWhere('username = :username', {
        username: usersDtoFindMany.search,
      });
      query.andWhere('email = :email', { email: usersDtoFindMany.search });
      query.andWhere('phoneNumber = :phoneNumber', {
        phoneNumber: usersDtoFindMany.search,
      });
    }

    let skip = 0;
    if (usersDtoFindMany.resultsPerPage && usersDtoFindMany.page > 1) {
      skip = usersDtoFindMany.resultsPerPage * (usersDtoFindMany.page - 1);
    }

    let take = Infinity;
    if (usersDtoFindMany.resultsPerPage) {
      take = usersDtoFindMany.resultsPerPage;
    }

    query
      .orderBy(
        ':sortBy',
        upperCase(usersDtoFindMany.sortOrder ?? 'asc') as 'ASC' | 'DESC',
      )
      .setParameters({ sortBy: usersDtoFindMany.sortBy ?? 'username' })
      .skip(skip)
      .take(take);

    return query.getRawMany();
  }

  async updateManyWhole(
    usersDtoUpdateOneWholeArray: UsersDtoUpdateOneWhole[],
  ): Promise<UsersEntity[]> {
    const ids = usersDtoUpdateOneWholeArray.map(
      (userEntityWhole) => userEntityWhole.id,
    );
    const usersEntities = await this.usersRepository.findBy({
      id: In(ids),
    });

    if (usersEntities.length < ids.length) {
      const foundIds = usersEntities.map((usersEntity) => usersEntity.id);
      const missingIds = difference(ids, foundIds);
      throw new NotFoundException(
        `users not found. missing ids: ${missingIds.join(', ')}`,
      );
    }

    const usersEntitiesUpdated = usersEntities.map(
      (usersEntity, usersEntityIndex) => {
        if (
          usersEntity.id !== usersDtoUpdateOneWholeArray[usersEntityIndex].id
        ) {
          throw new InternalServerErrorException('user indexes dont match');
        }

        return Object.assign(
          usersEntity,
          usersDtoUpdateOneWholeArray[usersEntityIndex],
        );
      },
    );

    return this.usersRepository.save(usersEntitiesUpdated);
  }

  async updateManyPartial(
    usersDtoUpdateManyPartialObject: Record<
      UsersEntity['id'],
      UsersDtoUpdateOnePartial
    >,
  ): Promise<UsersEntity[]> {
    const ids = keys(usersDtoUpdateManyPartialObject);
    const usersEntities = await this.usersRepository.findBy({
      id: In(ids),
    });

    if (usersEntities.length < ids.length) {
      const foundIds = usersEntities.map((usersEntity) => usersEntity.id);
      const missingIds = difference(ids, foundIds);
      throw new NotFoundException(
        `users not found. missing ids: ${missingIds.join(', ')}`,
      );
    }

    const usersEntitiesUpdated = usersEntities.map((usersEntity) => {
      return Object.assign(
        usersEntity,
        usersDtoUpdateManyPartialObject[usersEntity.id],
      );
    });

    return this.usersRepository.save(usersEntitiesUpdated);
  }

  async updateManyPartialWithPattern(
    usersDtoUpdateOnePartialWithPattern: UsersDtoUpdateOnePartialWithPattern,
  ): Promise<UsersEntity[]> {
    const { ids, usersDtoUpdateOnePartial } =
      usersDtoUpdateOnePartialWithPattern;
    const usersEntities = await this.usersRepository.findBy({
      id: In(ids),
    });

    if (usersEntities.length < ids.length) {
      const foundIds = usersEntities.map((usersEntity) => usersEntity.id);
      const missingIds = difference(ids, foundIds);
      throw new NotFoundException(
        `users not found. missing ids: ${missingIds.join(', ')}`,
      );
    }

    const usersEntitiesUpdated = usersEntities.map((usersEntity) => {
      return Object.assign(usersEntity, usersDtoUpdateOnePartial);
    });

    return this.usersRepository.save(usersEntitiesUpdated);
  }

  async deleteMany(usersDtoDeleteMany: UsersDtoDeleteMany): Promise<void> {
    const { ids } = usersDtoDeleteMany;
    const usersEntities = await this.usersRepository.findBy({
      id: In(ids),
    });

    if (usersEntities.length < ids.length) {
      const foundIds = usersEntities.map((usersEntity) => usersEntity.id);
      const missingIds = difference(ids, foundIds);
      throw new NotFoundException(
        `users not found. missing ids: ${missingIds.join(', ')}`,
      );
    }

    await this.usersRepository.remove(usersEntities);
  }
}

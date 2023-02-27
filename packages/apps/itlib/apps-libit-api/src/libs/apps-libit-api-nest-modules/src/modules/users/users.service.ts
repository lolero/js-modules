import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import upperCase from 'lodash/upperCase';
import keys from 'lodash/keys';
import isEmpty from 'lodash/isEmpty';
import {
  AuthUsersService,
  EntityUniqueKeyValue,
  requestsUtilCrossCheckIds,
  UpdateManyEntitiesObjectDto,
} from '../../../../api-nest-utils/src';
import { UsersEntity } from './users.entity';
import { UsersDtoCreateOne } from './users.dto.createOne';
import { UsersDtoFindMany } from './users.dto.findMany';
import { UsersUniqueKeyName } from './users.types';
import { SystemRolesName } from '../systemRoles/systemRoles.types';
import { SystemRolesService } from '../systemRoles/systemRoles.service';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';
import { UsersServiceValidator } from './users.service.validator';

@Injectable()
export class UsersService implements AuthUsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private usersServiceValidator: UsersServiceValidator,
    private systemRolesService: SystemRolesService,
  ) {}

  async createMany(
    usersDtoCreateOneArray: UsersDtoCreateOne[],
  ): Promise<UsersEntity[]> {
    const systemRolesUser = await this.systemRolesService.findOne(
      'name',
      SystemRolesName.USER,
    );

    const usersEntities = this.usersRepository
      .create(usersDtoCreateOneArray)
      .map((userEntity) => {
        const userEntityWithSystemRoles = {
          ...userEntity,
          systemRoles: [systemRolesUser],
        };

        return userEntityWithSystemRoles;
      });

    return this.usersRepository.save(usersEntities);
  }

  async findOne(
    uniqueKeyName: UsersUniqueKeyName,
    uniqueKeyValue: EntityUniqueKeyValue,
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

  // TODO: Implement updating of entity's edges as well as permission checks
  //  for the case of users' systemRoles
  async updateManyPartial(
    usersUpdateManyPartialObject: UpdateManyEntitiesObjectDto<
      UsersEntity,
      UsersDtoUpdateOnePartial
    >,
    currentUser?: UsersEntity,
    currentPassword?: string,
  ): Promise<UsersEntity[]> {
    const ids = keys(usersUpdateManyPartialObject).map((id) => Number(id));
    const usersEntities = await this.usersRepository.findBy({
      id: In(ids),
    });

    requestsUtilCrossCheckIds(ids, usersEntities);

    const usersEntitiesUpdated: UsersEntity[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const usersEntity of usersEntities) {
      if (isEmpty(usersUpdateManyPartialObject[usersEntity.id])) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const usersDtoUpdateOne = usersUpdateManyPartialObject[usersEntity.id];
      const usersEntityUpdated = {
        ...usersEntity,
      } as UsersEntity;

      const isValidUpdateCredentialsPermissions =
        // eslint-disable-next-line no-await-in-loop
        await this.usersServiceValidator.validateElevatedPermissions(
          usersEntity,
          currentUser,
          currentPassword,
        );

      if (
        (usersDtoUpdateOne.username ||
          usersDtoUpdateOne.email ||
          usersDtoUpdateOne.phoneNumber ||
          usersDtoUpdateOne.password) &&
        !isValidUpdateCredentialsPermissions
      ) {
        throw new UnauthorizedException(
          `user is not authorized to update credentials of user id: ${usersEntity.id}`,
        );
      }

      if (usersDtoUpdateOne.username) {
        const isUsernameValid =
          // eslint-disable-next-line no-await-in-loop
          await this.usersServiceValidator.validateUsername(
            usersDtoUpdateOne.username,
          );

        if (isUsernameValid) {
          usersEntityUpdated.username = usersDtoUpdateOne.username;
        } else {
          throw new BadRequestException(
            `invalid username: ${usersDtoUpdateOne.username}`,
          );
        }
      }

      if (usersDtoUpdateOne.email) {
        const isEmailValid =
          // eslint-disable-next-line no-await-in-loop
          await this.usersServiceValidator.validateEmail(
            usersDtoUpdateOne.email,
          );

        if (isEmailValid) {
          usersEntityUpdated.email = usersDtoUpdateOne.email;
        } else {
          throw new BadRequestException(
            `invalid email: ${usersDtoUpdateOne.email}`,
          );
        }
      }

      if (usersDtoUpdateOne.phoneNumber) {
        const isPhoneNumberValid =
          // eslint-disable-next-line no-await-in-loop
          await this.usersServiceValidator.validatePhoneNumber(
            usersDtoUpdateOne.phoneNumber,
          );

        if (isPhoneNumberValid) {
          usersEntityUpdated.phoneNumber = usersDtoUpdateOne.phoneNumber;
        } else {
          throw new BadRequestException(
            `invalid phoneNumber: ${usersDtoUpdateOne.phoneNumber}`,
          );
        }
      }

      if (usersDtoUpdateOne.firstName) {
        usersEntityUpdated.firstName = usersDtoUpdateOne.firstName;
      }

      if (usersDtoUpdateOne.lastName) {
        usersEntityUpdated.lastName = usersDtoUpdateOne.lastName;
      }

      if (usersDtoUpdateOne.middleName) {
        usersEntityUpdated.middleName = usersDtoUpdateOne.middleName;
      }

      usersEntitiesUpdated.push(usersEntityUpdated);
    }

    return usersEntitiesUpdated;

    return this.usersRepository.save(usersEntitiesUpdated);
  }

  async deleteMany(
    ids: number[],
    currentUser?: UsersEntity,
    currentPassword?: string,
  ): Promise<void> {
    const usersEntities = await this.usersRepository.findBy({
      id: In(ids),
    });

    requestsUtilCrossCheckIds(ids, usersEntities);

    // eslint-disable-next-line no-restricted-syntax
    for (const usersEntity of usersEntities) {
      const isValidDeletePermissions =
        // eslint-disable-next-line no-await-in-loop
        await this.usersServiceValidator.validateElevatedPermissions(
          usersEntity,
          currentUser,
          currentPassword,
        );

      if (!isValidDeletePermissions) {
        throw new UnauthorizedException(
          `user is not authorized to delete user id: ${usersEntity.id}`,
        );
      }

      if (ids.length > 1 && usersEntity.id === currentUser.id) {
        throw new BadRequestException(
          'user cannot to delete their own account in a bulk operation',
        );
      }
    }

    await this.usersRepository.remove(usersEntities);
  }
}

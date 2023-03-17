import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Brackets, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import upperCase from 'lodash/upperCase';
import keys from 'lodash/keys';
import isEmpty from 'lodash/isEmpty';
import keyBy from 'lodash/keyBy';
import values from 'lodash/values';
import pick from 'lodash/pick';
import {
  EntityUniqueKeyValue,
  requestsUtilCrossCheckIds,
  requestsUtilGetUniqueKeysWhereFactory,
  UpdateManyEntitiesObjectDto,
  utilsGetFilterDateRange,
} from '@js-modules/api-nest-utils';
import {
  AuthUsersService,
  authUtilValidatePassword,
} from '@js-modules/api-nest-module-auth-basic';
import { UsersEntity } from './users.entity';
import { UsersDtoCreateOne } from './users.dto.createOne';
import { UsersDtoFindMany } from './users.dto.findMany';
import { UsersUniqueKeyName } from './users.types';
import { SystemRolesName } from '../systemRoles/systemRoles.types';
import { SystemRolesService } from '../systemRoles/systemRoles.service';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';
import { UsersServiceValidator } from './users.service.validator';
import { UsersDtoUpdateOneWhole } from './users.dto.updateOneWhole';

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
        } as UsersEntity;

        return userEntityWithSystemRoles;
      });

    return this.usersRepository.save(usersEntities);
  }

  async findOne(
    uniqueKeyName: UsersUniqueKeyName,
    uniqueKeyValue: EntityUniqueKeyValue,
  ): Promise<UsersEntity | null> {
    const usersEntity = await this.usersRepository.findOneBy({
      [uniqueKeyName]: uniqueKeyValue,
    });

    return usersEntity;
  }

  async findMany(
    usersDtoFindMany: UsersDtoFindMany,
    currentUser?: UsersEntity,
    currentPassword?: string,
  ): Promise<UsersEntity[]> {
    const query = this.usersRepository.createQueryBuilder().select('*');

    if (usersDtoFindMany.uniqueKeys && !isEmpty(usersDtoFindMany.uniqueKeys)) {
      if (usersDtoFindMany.search) {
        throw new BadRequestException(
          'filtering by unique keys is only supported on its own. this request also included a search term',
        );
      }

      const whereFactory = requestsUtilGetUniqueKeysWhereFactory(
        usersDtoFindMany.uniqueKeys,
      );
      query.where(new Brackets(whereFactory));
    }

    if (usersDtoFindMany.createdAtRange) {
      const createdAtRange = utilsGetFilterDateRange(
        usersDtoFindMany.createdAtRange[0],
        usersDtoFindMany.createdAtRange[1],
      );
      query.andWhere('created_at >= :createdAtFrom', {
        createdAtFrom: createdAtRange[0],
      });
      query.andWhere('created_at <= :createdAtTo', {
        createdAtTo: createdAtRange[1],
      });
    }

    if (usersDtoFindMany.updatedAtRange) {
      const updatedAtRange = utilsGetFilterDateRange(
        usersDtoFindMany.updatedAtRange[0],
        usersDtoFindMany.updatedAtRange[1],
      );
      query.andWhere('updated_at >= :updatedAtFrom', {
        updatedAtFrom: updatedAtRange[0],
      });
      query.andWhere('updated_at <= :updatedAtTo', {
        updatedAtTo: updatedAtRange[1],
      });
    }

    if (usersDtoFindMany.deletedAtRange) {
      const deletedAtRange = utilsGetFilterDateRange(
        usersDtoFindMany.deletedAtRange[0],
        usersDtoFindMany.deletedAtRange[1],
      );
      query.andWhere('deleted_at >= :deletedAtFrom', {
        deletedAtFrom: deletedAtRange[0],
      });
      query.andWhere('deleted_at <= :deletedAtTo', {
        deletedAtTo: deletedAtRange[1],
      });
    }

    if (usersDtoFindMany.search) {
      query.andWhere('username = :username', {
        username: usersDtoFindMany.search,
      });
      query.andWhere('email = :email', { email: usersDtoFindMany.search });
      query.andWhere('phone_number = :phoneNumber', {
        phoneNumber: usersDtoFindMany.search,
      });
      query.andWhere('first_name = :firstName', {
        firstName: usersDtoFindMany.search,
      });
      query.andWhere('middle_name = :middleName', {
        middleName: usersDtoFindMany.search,
      });
      query.andWhere('last_name = :lastName', {
        lastName: usersDtoFindMany.search,
      });
    }

    let skip = 0;
    if (
      usersDtoFindMany.resultsPerPage &&
      usersDtoFindMany.page &&
      usersDtoFindMany.page > 1
    ) {
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

  async updateManyPartial(
    usersUpdateManyPartialObject: UpdateManyEntitiesObjectDto<
      UsersEntity,
      UsersDtoUpdateOnePartial | UsersDtoUpdateOneWhole
    >,
    currentUser?: UsersEntity,
    currentPassword?: string,
  ): Promise<UsersEntity[]> {
    const ids = keys(usersUpdateManyPartialObject).map((id) => Number(id));
    const usersEntities = await this.usersRepository.findBy({
      id: In(ids),
    });

    requestsUtilCrossCheckIds(ids, usersEntities);

    const systemRolesEntities = await this.systemRolesService.findMany({});
    const systemRolesByRoleName = keyBy(systemRolesEntities, 'name');
    const isCurrentUserSystemRole = {
      [SystemRolesName.SUPER_ADMIN]:
        this.usersServiceValidator.validateCurrentUserSystemRoles(
          [SystemRolesName.SUPER_ADMIN],
          currentUser,
        ),
      [SystemRolesName.ADMIN]:
        this.usersServiceValidator.validateCurrentUserSystemRoles(
          [SystemRolesName.ADMIN],
          currentUser,
        ),
      [SystemRolesName.USER]:
        this.usersServiceValidator.validateCurrentUserSystemRoles(
          [SystemRolesName.USER],
          currentUser,
        ),
    };

    const isCurrentUserPasswordValid = await authUtilValidatePassword(
      currentPassword,
      currentUser?.password,
    );

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

      // eslint-disable-next-line no-await-in-loop
      const isUsersEntityPasswordValid = await authUtilValidatePassword(
        currentPassword,
        usersEntity?.password,
      );

      const isSensitiveCredentialsUpdated =
        !!usersDtoUpdateOne.username ||
        !!usersDtoUpdateOne.email ||
        !!usersDtoUpdateOne.phoneNumber ||
        !!usersDtoUpdateOne.password;
      if (isSensitiveCredentialsUpdated) {
        const isValidUpdateSensitiveCredentialsPermissions =
          (isCurrentUserSystemRole[SystemRolesName.SUPER_ADMIN] &&
            isCurrentUserPasswordValid) ||
          isUsersEntityPasswordValid;
        if (!isValidUpdateSensitiveCredentialsPermissions) {
          throw new UnauthorizedException(
            `user is not authorized to update sensitive credentials of user id: ${usersEntity.id}`,
          );
        }
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

      if (usersDtoUpdateOne.systemRolesNames) {
        if (usersEntity.id === currentUser?.id) {
          throw new UnauthorizedException(
            'user is not authorized to update their own system roles',
          );
        }

        const systemRolesNamesUpdated =
          this.usersServiceValidator.getSystemRolesNamesUpdated(
            systemRolesByRoleName,
            usersDtoUpdateOne,
            isCurrentUserSystemRole,
            isCurrentUserPasswordValid,
            usersEntity,
          );

        const systemRolesUpdated = values(
          pick(systemRolesByRoleName, systemRolesNamesUpdated),
        );
        usersEntityUpdated.systemRoles = systemRolesUpdated;
      }

      usersEntitiesUpdated.push(usersEntityUpdated);
    }

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

    const isCurrentUserSuperAdmin =
      this.usersServiceValidator.validateCurrentUserSystemRoles(
        [SystemRolesName.SUPER_ADMIN],
        currentUser,
      );
    const isCurrentUserPasswordValid = await authUtilValidatePassword(
      currentPassword,
      currentUser?.password,
    );

    // eslint-disable-next-line no-restricted-syntax
    for (const usersEntity of usersEntities) {
      // eslint-disable-next-line no-await-in-loop
      const isUsersEntityPasswordValid = await authUtilValidatePassword(
        currentPassword,
        usersEntity?.password,
      );

      const isValidDeletePermissions =
        (isCurrentUserSuperAdmin && isCurrentUserPasswordValid) ||
        isUsersEntityPasswordValid;

      if (!isValidDeletePermissions) {
        throw new UnauthorizedException(
          `user is not authorized to delete user id: ${usersEntity.id}`,
        );
      }

      if (ids.length > 1 && usersEntity.id === currentUser?.id) {
        throw new BadRequestException(
          'user cannot to delete their own account in a bulk operation',
        );
      }
    }

    await this.usersRepository.softRemove(usersEntities);
  }
}

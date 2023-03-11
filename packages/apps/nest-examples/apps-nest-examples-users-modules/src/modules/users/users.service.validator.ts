import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import uniq from 'lodash/uniq';
import difference from 'lodash/difference';
import sortedUniq from 'lodash/sortedUniq';
import sortBy from 'lodash/sortBy';
import pull from 'lodash/pull';
import { MAX_DATE_MILLISECONDS } from '@js-modules/common-utils-general';
import { UsersEntity } from './users.entity';
import { SystemRolesName } from '../systemRoles/systemRoles.types';
import { SystemRolesEntity } from '../systemRoles/systemRoles.entity';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';
import { UsersDtoUpdateOneWhole } from './users.dto.updateOneWhole';

@Injectable()
export class UsersServiceValidator {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  validateCurrentUserSystemRoles(
    systemRolesNames: SystemRolesName[],
    currentUser?: UsersEntity,
  ): boolean {
    const systemRolesNamesUnique = uniq(systemRolesNames);
    const currentUserSystemRoleNames = (currentUser?.systemRoles ?? []).map(
      (systemRole) => systemRole.name,
    );
    const missingSystemRoles = difference(
      systemRolesNamesUnique,
      currentUserSystemRoleNames,
    );

    const isValidCurrentUserSystemRoles = !missingSystemRoles.length;
    return isValidCurrentUserSystemRoles;
  }

  async validateUsername(username: UsersEntity['username']): Promise<boolean> {
    const usersEntity = await this.usersRepository.findOneBy({
      username,
    });

    const isValidUsername = !usersEntity;
    return isValidUsername;
  }

  async validateEmail(email: UsersEntity['email']): Promise<boolean> {
    const usersEntity = await this.usersRepository.findOneBy({
      email,
    });

    const isValidEmail = !usersEntity;
    return isValidEmail;
  }

  async validatePhoneNumber(
    phoneNumber: UsersEntity['phoneNumber'],
  ): Promise<boolean> {
    const usersEntity = await this.usersRepository.findOneBy({
      phoneNumber,
    });

    const isValidPhoneNumber = !usersEntity;
    return isValidPhoneNumber;
  }

  getSystemRolesNamesUpdated(
    systemRolesByRoleName: Record<string, SystemRolesEntity>,
    usersDtoUpdateOne: UsersDtoUpdateOnePartial | UsersDtoUpdateOneWhole,
    isCurrentUserSystemRole: Record<SystemRolesName, boolean>,
    isCurrentUserPasswordValid: boolean,
    usersEntity: UsersEntity,
  ): SystemRolesName[] {
    const errorText = `user is not authorized to update system roles of user id: ${usersEntity.id}`;
    if (!isCurrentUserPasswordValid) {
      throw new UnauthorizedException(errorText);
    }

    const usersEntitySystemRolesNames = usersEntity.systemRoles.map(
      (systemRolesEntity) => systemRolesEntity.name,
    );
    const systemRolesNamesToAdd = difference(
      usersDtoUpdateOne.systemRolesNames,
      usersEntitySystemRolesNames,
    );
    const systemRolesNamesToRemove = difference(
      usersEntitySystemRolesNames,
      usersDtoUpdateOne.systemRolesNames ?? [],
    );

    let isValidUpdateSystemRolesPermissions: boolean =
      isCurrentUserPasswordValid;
    const systemRolesNamesUpdated = usersEntity.systemRoles.map(
      (systemRolesEntity) => systemRolesEntity.name,
    );
    if (systemRolesNamesToRemove.includes(SystemRolesName.SUPER_ADMIN)) {
      isValidUpdateSystemRolesPermissions =
        isValidUpdateSystemRolesPermissions &&
        isCurrentUserSystemRole[SystemRolesName.SUPER_ADMIN];
      pull(systemRolesNamesUpdated, SystemRolesName.SUPER_ADMIN);
    }
    if (systemRolesNamesToRemove.includes(SystemRolesName.ADMIN)) {
      isValidUpdateSystemRolesPermissions =
        isValidUpdateSystemRolesPermissions &&
        isCurrentUserSystemRole[SystemRolesName.SUPER_ADMIN];
      pull(systemRolesNamesUpdated, SystemRolesName.ADMIN);
    }
    if (systemRolesNamesToRemove.includes(SystemRolesName.USER)) {
      isValidUpdateSystemRolesPermissions =
        isValidUpdateSystemRolesPermissions &&
        isCurrentUserSystemRole[SystemRolesName.ADMIN];
      pull(systemRolesNamesUpdated, SystemRolesName.USER);
    }

    if (systemRolesNamesToAdd.includes(SystemRolesName.USER)) {
      isValidUpdateSystemRolesPermissions =
        isValidUpdateSystemRolesPermissions &&
        isCurrentUserSystemRole[SystemRolesName.ADMIN];
      systemRolesNamesUpdated.push(SystemRolesName.USER);
    }
    if (systemRolesNamesToAdd.includes(SystemRolesName.ADMIN)) {
      isValidUpdateSystemRolesPermissions =
        isValidUpdateSystemRolesPermissions &&
        isCurrentUserSystemRole[SystemRolesName.SUPER_ADMIN];
      systemRolesNamesUpdated.push(SystemRolesName.USER, SystemRolesName.ADMIN);
    }
    if (systemRolesNamesToAdd.includes(SystemRolesName.SUPER_ADMIN)) {
      isValidUpdateSystemRolesPermissions =
        isValidUpdateSystemRolesPermissions &&
        isCurrentUserSystemRole[SystemRolesName.SUPER_ADMIN];
      systemRolesNamesUpdated.push(
        SystemRolesName.USER,
        SystemRolesName.ADMIN,
        SystemRolesName.SUPER_ADMIN,
      );
    }

    if (!isValidUpdateSystemRolesPermissions) {
      throw new UnauthorizedException(errorText);
    }

    const systemRolesNamesUpdatedSortedUniq = sortedUniq(
      sortBy(systemRolesNamesUpdated),
    );
    return systemRolesNamesUpdatedSortedUniq;
  }

  getFilterDateRange(
    from: number | string | null,
    to: number | string | null,
  ): [Date, Date] {
    const dateFrom = new Date(from ?? 0);
    const dateTo = new Date(to ?? MAX_DATE_MILLISECONDS);
    return [dateFrom, dateTo];
  }
}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { authUtilValidatePassword } from '../../../../api-nest-utils/src/modules/auth/auth.util.validatePassword';
import { SystemRolesName } from '../systemRoles/systemRoles.types';

@Injectable()
export class UsersServiceValidator {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async validateElevatedPermissions(
    usersEntity: UsersEntity,
    currentUser?: UsersEntity,
    currentPassword?: string,
  ): Promise<boolean> {
    let isValidUpdateCredentialsPermissions = false;

    const isUserSuperAdmin = currentUser?.systemRoles
      ?.map((systemRole) => systemRole.name)
      .includes(SystemRolesName.SUPER_ADMIN);

    if (isUserSuperAdmin) {
      isValidUpdateCredentialsPermissions = true;
      return isValidUpdateCredentialsPermissions;
    }

    const isPasswordValid = await authUtilValidatePassword(
      currentPassword,
      usersEntity.password,
    );

    if (isPasswordValid) {
      isValidUpdateCredentialsPermissions = true;
      return isValidUpdateCredentialsPermissions;
    }

    return isValidUpdateCredentialsPermissions;
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
}

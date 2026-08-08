import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { KeycloakTokenParsed } from 'keycloak-js' with {
  'resolution-mode': 'import',
};
import keys from 'lodash/keys';
import { Repository } from 'typeorm';
import { UserRepresentation } from '@js-modules/api-nest-keycloak-admin-client-cjs';
import { UsersUpdateOnePartialDto } from './dtos/users.updateOnePartial.dto';
import { UsersEntity } from './users.entity';
import { KeycloakUser } from './users.types';

@Injectable()
export class UsersServiceUtils {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  getKeycloakUserFromTokenParsed(
    keycloakTokenParsed: KeycloakTokenParsed,
  ): KeycloakUser {
    const keycloakUser: KeycloakUser = {
      keycloakId: keycloakTokenParsed.sub!,
      username: keycloakTokenParsed.preferred_username as string | undefined,
      email: keycloakTokenParsed.email as string,
      phoneNumber: keycloakTokenParsed.phone_number as string | undefined,
      firstName: keycloakTokenParsed.given_name as string | undefined,
      middleName: keycloakTokenParsed.middle_name as string | undefined,
      lastName: keycloakTokenParsed.family_name as string | undefined,
    };

    return keycloakUser;
  }

  getUpdatedKeycloakUserRepresentation(
    userRepresentation: UserRepresentation,
    usersUpdateOnePartialDto: UsersUpdateOnePartialDto,
  ): UserRepresentation {
    const userKeycloak: KeycloakUser = {
      keycloakId: userRepresentation.id!,
      username: userRepresentation.username,
      email: userRepresentation.email!,
      firstName: userRepresentation.firstName,
      lastName: userRepresentation.lastName,
    };

    (
      keys(usersUpdateOnePartialDto) as (keyof KeycloakUser &
        keyof UsersUpdateOnePartialDto)[]
    ).forEach((usersEntityKey) => {
      const usersEntityValue = usersUpdateOnePartialDto[usersEntityKey];
      if (usersEntityValue === undefined) {
        return;
      }

      userKeycloak[usersEntityKey] = usersEntityValue;
    });

    const userRepresentationUpdated: UserRepresentation = {
      ...userRepresentation,
      username: userKeycloak.username,
      email: userKeycloak.email,
      firstName: userKeycloak.firstName,
      lastName: userKeycloak.lastName,
    };

    return userRepresentationUpdated;
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

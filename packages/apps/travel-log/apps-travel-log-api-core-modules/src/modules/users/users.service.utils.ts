import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { KeycloakTokenParsed } from 'keycloak-js';
import { UserRepresentation } from '@js-modules/api-nest-keycloak-admin-client-cjs';
import entries from 'lodash/entries';
import { UsersEntity } from './users.entity';
import { KeycloakUser } from './users.types';
import { UsersUpdateOnePartialDto } from './dtos/users.updateOnePartial.dto';

@Injectable()
export class UsersServiceUtils {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  getKeycloakUserFromTokenParsed(
    keycloakTokenParsed: KeycloakTokenParsed,
  ): KeycloakUser {
    const keycloakUser: KeycloakUser = {
      keycloakId: keycloakTokenParsed.sub!,
      username: keycloakTokenParsed.preferred_username ?? null,
      email: keycloakTokenParsed.email,
      phoneNumber: keycloakTokenParsed.phone_number ?? null,
      firstName: keycloakTokenParsed.given_name ?? null,
      middleName: keycloakTokenParsed.middle_name ?? null,
      lastName: keycloakTokenParsed.family_name ?? null,
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

    entries(usersUpdateOnePartialDto).forEach(
      ([usersEntityKey, usersEntityValue]) => {
        if (usersEntityValue === undefined) {
          return;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        userKeycloak[usersEntityKey] = usersEntityValue;
      },
    );

    const updatedUserRepresentation: UserRepresentation = {
      ...userRepresentation,
      username: userKeycloak.username,
      email: userKeycloak.email,
      firstName: userKeycloak.firstName,
      lastName: userKeycloak.lastName,
    };

    return updatedUserRepresentation;
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

import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { UsersUpdateOnePartialDto } from './dtos/users.updateOnePartial.dto';
import { UsersControllerPrivate } from './users.controller.private';
import type { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import {
  getUsersEntityFixture,
  getUsersUpdateOnePartialDtoFixture,
} from './users.utils.fixtures';

describe('UsersControllerPrivate', () => {
  const currentUser = getUsersEntityFixture({ id: 1000 });
  let usersEntity: UsersEntity | null;

  let usersServiceUpdateOnePartialMock: jest.Mock;
  let usersServiceResetPasswordMock: jest.Mock;
  let usersServiceDeleteOneMock: jest.Mock;
  let usersServiceMock: UsersService;
  let usersControllerPrivate: UsersControllerPrivate;

  beforeEach(async () => {
    usersServiceUpdateOnePartialMock = jest.fn();
    usersServiceResetPasswordMock = jest.fn();
    usersServiceDeleteOneMock = jest.fn();
    usersServiceMock = {
      updateOnePartial: usersServiceUpdateOnePartialMock,
      resetPassword: usersServiceResetPasswordMock,
      deleteOne: usersServiceDeleteOneMock,
    } as unknown as UsersService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
      controllers: [UsersControllerPrivate],
    }).compile();

    usersControllerPrivate = module.get<UsersControllerPrivate>(
      UsersControllerPrivate,
    );
  });

  it('Should create an instance of UsersControllerPrivate', () => {
    expect(usersControllerPrivate).toBeDefined();
  });

  describe('checkIn', () => {
    it('Should return the usersEntityCurrent', () => {
      usersEntity = usersControllerPrivate.checkIn(currentUser);

      expect(usersEntity).toBe(currentUser);
    });
  });

  describe('updateOnePartial', () => {
    let usersServiceUpdateOnePartialMockReturnValue: UsersEntity;
    let testUsersUpdateOnePartialDto: UsersUpdateOnePartialDto;

    it('Should call usersService.updateOnePartial with a UsersUpdateOnePartialDto, the usersEntityCurrent, and return the updated users', async () => {
      usersServiceUpdateOnePartialMockReturnValue = getUsersEntityFixture();
      usersServiceUpdateOnePartialMock.mockReturnValue(
        usersServiceUpdateOnePartialMockReturnValue,
      );

      testUsersUpdateOnePartialDto = getUsersUpdateOnePartialDtoFixture();
      usersEntity = await usersControllerPrivate.updateOnePartial(
        testUsersUpdateOnePartialDto,
        currentUser,
      );

      expect(usersServiceUpdateOnePartialMock).toHaveBeenNthCalledWith(
        1,
        testUsersUpdateOnePartialDto,
        currentUser,
      );
      expect(usersEntity).toEqual(usersServiceUpdateOnePartialMockReturnValue);
    });
  });

  describe('resetPassword', () => {
    it('Should call usersService.resetPassword with the usersEntityCurrent', async () => {
      await usersControllerPrivate.resetPassword(currentUser);

      expect(usersServiceResetPasswordMock).toHaveBeenNthCalledWith(
        1,
        currentUser,
      );
    });
  });

  describe('deleteOne', () => {
    it('Should call usersService.deleteOne with the usersEntityCurrent', async () => {
      await usersControllerPrivate.deleteOne(currentUser);

      expect(usersServiceDeleteOneMock).toHaveBeenNthCalledWith(1, currentUser);
    });
  });
});

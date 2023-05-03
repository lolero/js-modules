import { UsersPublicDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/users/dtos/users.public.dto';
import { NodeUser, NodeUsersReducer } from './nodeUsers.types';
import { getPkOfNodeUser } from './nodeUsers.pkUtils';

export function normalizeUsersPublicDtoArray(
  usersPublicDtoArray: UsersPublicDto[],
): NodeUsersReducer['data'] {
  const normalizedNodeUsers: NodeUsersReducer['data'] =
    usersPublicDtoArray.reduce(
      (normalizedNodeUsersTemp: NodeUsersReducer['data'], usersPublicDto) => {
        const nodeUser: NodeUser = {
          id: usersPublicDto.id,
          username: usersPublicDto.username,
          firstName: usersPublicDto.firstName,
          middleName: usersPublicDto.middleName,
          lastName: usersPublicDto.lastName,
          createdAt: usersPublicDto.createdAt,
          deletedAt: usersPublicDto.deletedAt,
        };

        return {
          ...normalizedNodeUsersTemp,
          [getPkOfNodeUser(nodeUser)]: nodeUser,
        };
      },
      {},
    );

  return normalizedNodeUsers;
}

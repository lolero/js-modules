import { NodeUser, NodeUserRaw, NodeUsersReducer } from './nodeUsers.types';
import { getPkOfNodeUser } from './nodeUsers.pkUtils';

export function normalizeNodeUsersRawArray(
  nodeUsersRaw: NodeUserRaw[],
): NodeUsersReducer['data'] {
  const normalizedNodeUsers: NodeUsersReducer['data'] = nodeUsersRaw.reduce(
    (normalizedNodeUsersTemp: NodeUsersReducer['data'], nodeUserRaw) => {
      const nodeUser: NodeUser = {
        uid: nodeUserRaw.uid,
        email: nodeUserRaw.email,
        displayName: nodeUserRaw.displayName,
        role: nodeUserRaw.role,
        createdAt: nodeUserRaw.creationTime,
        lastSignInAt: nodeUserRaw.lastSignInTime,
        __edges__: {
          reservations: [],
        },
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

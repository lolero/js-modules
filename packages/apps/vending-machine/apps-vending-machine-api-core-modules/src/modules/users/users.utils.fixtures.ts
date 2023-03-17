import { UsersEntity } from './users.entity';
import { UsersEntityType } from './users.types';

export function getUsersEntityFixture(
  overrides: Partial<UsersEntityType> = {},
): UsersEntity {
  const usersEntityDefault: UsersEntityType = {
    id: 1,
    keycloakId: 'test_keycloak_id',
    username: 'test_username_1',
    email: 'test_1@email.com',
    firstName: 'test_first_name',
    lastName: 'test_last_name',
    balance: 0,
    products: Promise.resolve([]),
    createdAt: new Date('2000-01-01T00:00:00.000Z'),
    updatedAt: new Date('2000-01-01T00:00:00.000Z'),
  };

  const usersEntity = Object.assign(usersEntityDefault, overrides);

  return usersEntity as UsersEntity;
}

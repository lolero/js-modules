export interface AuthUsersEntity {
  id: string | number;
  username?: string | null;
  email: string;
  phoneNumber?: string | null;
  password: string;
}

export type UsersUniqueKeyName = keyof Pick<
  AuthUsersEntity,
  'id' | 'username' | 'email' | 'phoneNumber'
>;
export type UsersUniqueKeyValue = string | number;

export type UserWithoutId = Omit<AuthUsersEntity, 'id'>;

export interface AuthUsersService {
  createOne: (userWithoutId: UserWithoutId) => Promise<AuthUsersEntity>;
  findOne: (
    uniqueKeyName: UsersUniqueKeyName,
    uniqueKeyValue: UsersUniqueKeyValue,
  ) => Promise<AuthUsersEntity>;
}

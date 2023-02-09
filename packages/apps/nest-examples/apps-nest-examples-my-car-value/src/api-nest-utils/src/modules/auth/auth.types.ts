export interface UsersEntityType {
  id: number;
  email: string;
  password: string;
}

export interface UsersServiceType {
  createOne: (email: string, password: string) => Promise<UsersEntityType>;
  findOne: (id: number) => Promise<UsersEntityType>;
  findMany: (email: string) => Promise<UsersEntityType[]>;
}

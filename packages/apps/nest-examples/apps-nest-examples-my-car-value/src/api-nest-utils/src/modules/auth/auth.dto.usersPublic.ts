import { Expose } from 'class-transformer';

export class AuthDtoUsersPublic {
  @Expose()
  id: number;

  @Expose()
  email: string;
}

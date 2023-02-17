import { Expose } from 'class-transformer';
import { AuthUsersEntity } from './auth.types';

export class AuthDtoPublicUser {
  @Expose()
  id: AuthUsersEntity['id'];

  @Expose()
  username: AuthUsersEntity['username'];

  @Expose()
  email: AuthUsersEntity['email'];

  @Expose()
  phoneNumber: AuthUsersEntity['phoneNumber'];
}

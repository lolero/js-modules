import { Expose } from 'class-transformer';
import { UsersEntity } from './users.entity';

export class UsersDtoPublic {
  @Expose()
  id: UsersEntity['id'];

  @Expose()
  keycloakId: UsersEntity['keycloakId'];

  @Expose()
  username: UsersEntity['username'];

  @Expose()
  email: UsersEntity['email'];

  @Expose()
  phoneNumber: UsersEntity['phoneNumber'];

  @Expose()
  firstName: UsersEntity['firstName'];

  @Expose()
  middleName: UsersEntity['middleName'];

  @Expose()
  lastName: UsersEntity['lastName'];
}

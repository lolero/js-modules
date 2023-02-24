import { Expose, Transform } from 'class-transformer';
import { AuthSystemRolesEntity, AuthUsersEntity } from './auth.types';

export class AuthDtoPublicUser {
  @Expose()
  id: AuthUsersEntity['id'];

  @Expose()
  username: AuthUsersEntity['username'];

  @Expose()
  email: AuthUsersEntity['email'];

  @Expose()
  phoneNumber: AuthUsersEntity['phoneNumber'];

  @Transform(({ obj }) => {
    return obj.systemRoles.map(
      (systemRolesEntity: AuthSystemRolesEntity) => systemRolesEntity.name,
    );
  })
  @Expose()
  systemRoles: AuthSystemRolesEntity['name'];
}

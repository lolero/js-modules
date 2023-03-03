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

  @Expose()
  firstName: AuthUsersEntity['firstName'];

  @Expose()
  middleName: AuthUsersEntity['middleName'];

  @Expose()
  lastName: AuthUsersEntity['lastName'];

  @Expose()
  @Transform(({ obj }: { obj: Date }) => {
    return obj.toISOString();
  })
  createdAt: string;

  @Expose()
  @Transform(({ obj }: { obj: Date }) => {
    return obj.toISOString();
  })
  updatedAt: string;

  @Transform(({ obj }: { obj: AuthUsersEntity }) => {
    return obj.systemRoles.map(
      (systemRolesEntity: AuthSystemRolesEntity) => systemRolesEntity.name,
    );
  })
  @Expose()
  systemRoles: AuthSystemRolesEntity['name'];
}

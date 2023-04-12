import { Expose, Transform } from 'class-transformer';
import { UsersEntity } from './users.entity';

export class UsersDtoPublic {
  @Expose()
  id: UsersEntity['id'];

  @Expose()
  username: UsersEntity['username'];

  @Expose()
  firstName: UsersEntity['firstName'];

  @Expose()
  middleName: UsersEntity['middleName'];

  @Expose()
  lastName: UsersEntity['lastName'];

  @Expose()
  @Transform(({ obj }: { obj: UsersEntity }) => {
    return obj.createdAt.toISOString();
  })
  createdAt: string;
}

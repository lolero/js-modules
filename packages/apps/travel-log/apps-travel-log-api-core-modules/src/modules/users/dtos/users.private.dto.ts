import { Expose, Transform } from 'class-transformer';
import { UsersEntity } from '../users.entity';
import { UsersPublicDto } from './users.public.dto';

export class UsersPrivateDto extends UsersPublicDto {
  @Expose()
  email: UsersEntity['email'];

  @Expose()
  phoneNumber: UsersEntity['phoneNumber'];

  @Expose()
  @Transform(({ obj }: { obj: UsersEntity }) => {
    return obj.updatedAt.toISOString();
  })
  updatedAt: string;
}

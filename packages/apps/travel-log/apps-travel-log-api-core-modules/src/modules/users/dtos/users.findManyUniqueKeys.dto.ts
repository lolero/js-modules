import { IsInt, IsOptional, IsString } from 'class-validator';
import { FindManyUniqueKeysDto } from '@js-modules/api-nest-utils';
import { UsersEntity } from '../users.entity';

export class UsersFindManyUniqueKeysDto
  implements FindManyUniqueKeysDto<UsersEntity>
{
  @IsInt({ each: true })
  @IsOptional()
  id?: UsersEntity['id'][];

  @IsString({ each: true })
  @IsOptional()
  keycloakId?: UsersEntity['keycloakId'][];

  @IsString({ each: true })
  @IsOptional()
  username?: UsersEntity['username'][];

  @IsString({ each: true })
  @IsOptional()
  email?: UsersEntity['email'][];

  @IsString({ each: true })
  @IsOptional()
  phoneNumber?: UsersEntity['phoneNumber'][];
}

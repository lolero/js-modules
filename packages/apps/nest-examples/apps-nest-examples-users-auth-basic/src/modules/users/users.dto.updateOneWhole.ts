import { IsOptional, IsInt, IsString } from 'class-validator';
import { UsersEntity } from './users.entity';
import { UsersDtoCreateOne } from './users.dto.createOne';
import { SystemRolesEntity } from '../systemRoles/systemRoles.entity';

export class UsersDtoUpdateOneWhole extends UsersDtoCreateOne {
  @IsInt()
  id: UsersEntity['id'];

  @IsString({ each: true })
  @IsOptional()
  systemRolesNames?: SystemRolesEntity['name'][];
}

import { IsInt, IsOptional, IsString } from 'class-validator';
import { SystemRolesEntity } from './systemRoles.entity';

export class SystemRolesDtoFindManyUniqueKeys {
  @IsInt({ each: true })
  @IsOptional()
  id?: SystemRolesEntity['id'][];

  @IsString({ each: true })
  @IsOptional()
  name?: SystemRolesEntity['name'][];
}

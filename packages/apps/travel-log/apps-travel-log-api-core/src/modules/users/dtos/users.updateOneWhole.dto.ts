import { IsInt } from 'class-validator';
import { UsersEntity } from '../users.entity';
import { UsersCreateOneDto } from './users.createOne.dto';

export class UsersUpdateOneWholeDto extends UsersCreateOneDto {
  @IsInt()
  id: UsersEntity['id'];
}

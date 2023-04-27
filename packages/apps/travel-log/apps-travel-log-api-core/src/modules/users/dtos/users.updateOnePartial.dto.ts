import { OmitType, PartialType } from '@nestjs/swagger';
import { UsersUpdateOneWholeDto } from './users.updateOneWhole.dto';

export class UsersUpdateOnePartialDto extends PartialType(
  OmitType(UsersUpdateOneWholeDto, ['id']),
) {}

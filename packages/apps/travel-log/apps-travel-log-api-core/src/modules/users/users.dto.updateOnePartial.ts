import { OmitType, PartialType } from '@nestjs/swagger';
import { UsersDtoUpdateOneWhole } from './users.dto.updateOneWhole';

export class UsersDtoUpdateOnePartial extends PartialType(
  OmitType(UsersDtoUpdateOneWhole, ['id']),
) {}

import { IsString } from 'class-validator';
import { EntityUniqueKeyValue } from '../types/types.requests';
import { isNumberOrString } from '../validators/validator.isNumberOrString';

export class DtoDeleteMany {
  @IsString()
  uniqueKeyName: string;

  @isNumberOrString({ each: true })
  uniqueKeyValues: EntityUniqueKeyValue[];
}

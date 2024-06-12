import { IsString } from 'class-validator';
import { isNumberOrString } from '../validators/validator.isNumberOrString';
import { EntityUniqueKeyValue } from '../types/types.requests';

export class DtoDeleteMany {
  @IsString()
  uniqueKeyName: string;

  @isNumberOrString({ each: true })
  uniqueKeyValues: EntityUniqueKeyValue[];
}

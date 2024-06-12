import { IsString, ValidateNested } from 'class-validator';
import { isNumberOrString } from '../validators/validator.isNumberOrString';
import { EntityUniqueKeyValue } from '../types/types.requests';

export class DtoUpdateManyPartialWithPattern<UpdateOnePartialDtoT> {
  @IsString()
  uniqueKeyName: string;

  @isNumberOrString({ each: true })
  uniqueKeyValues: EntityUniqueKeyValue[];

  @ValidateNested()
  updateOnePartialDto: UpdateOnePartialDtoT;
}

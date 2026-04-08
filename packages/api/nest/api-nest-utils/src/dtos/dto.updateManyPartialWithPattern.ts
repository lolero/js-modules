import { IsString, ValidateNested } from 'class-validator';
import { EntityUniqueKeyValue } from '../types/types.requests';
import { isNumberOrString } from '../validators/validator.isNumberOrString';

export class DtoUpdateManyPartialWithPattern<UpdateOnePartialDtoT> {
  @IsString()
  uniqueKeyName: string;

  @isNumberOrString({ each: true })
  uniqueKeyValues: EntityUniqueKeyValue[];

  @ValidateNested()
  updateOnePartialDto: UpdateOnePartialDtoT;
}

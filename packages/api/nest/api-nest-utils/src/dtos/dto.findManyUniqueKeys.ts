import { IsOptional } from 'class-validator';
import { isNumberOrString } from '../validators/validator.isNumberOrString';
import { RequestEntity } from '../types/types.requests';

export class DtoFindManyUniqueKeys<EntityT extends RequestEntity> {
  @isNumberOrString({ each: true })
  @IsOptional()
  id?: EntityT['id'][];
}

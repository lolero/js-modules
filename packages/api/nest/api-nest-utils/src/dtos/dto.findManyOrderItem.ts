import { IsEnum, IsString } from 'class-validator';
import {
  FindManyOrderDirection,
  FindManyOrderItemDto,
  RequestEntity,
} from '../types/types.requests';

export class DtoFindManyOrderItem<
  EntityT extends RequestEntity,
> implements FindManyOrderItemDto<EntityT> {
  @IsString()
  entityPropName: keyof EntityT;

  @IsEnum(FindManyOrderDirection)
  orderDirection: FindManyOrderDirection;
}

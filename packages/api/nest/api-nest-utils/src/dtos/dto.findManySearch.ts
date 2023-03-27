import { IsString } from 'class-validator';
import { FindManySearchDto, RequestEntity } from '../types/types.requests';

export class DtoFindManySearch<EntityT extends RequestEntity>
  implements FindManySearchDto<EntityT>
{
  @IsString()
  searchStr: string;

  @IsString({ each: true })
  entityPropNames: (keyof EntityT)[];
}

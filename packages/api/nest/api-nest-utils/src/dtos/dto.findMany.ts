import {
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import type {
  FindManySortOrder,
  RequestEntity,
  FindManyRangesDto,
  FindManyRelationsDto,
} from '../types/types.requests';
import { DtoFindManySearch } from './dto.findManySearch';
import { DtoFindManyUniqueKeys } from './dto.findManyUniqueKeys';
import {
  FindManySearchDto,
  FindManyUniqueKeysDto,
} from '../types/types.requests';

export class DtoFindMany<
  EntityT extends RequestEntity,
  FindManyUniqueKeysDtoT extends FindManyUniqueKeysDto<EntityT> = DtoFindManyUniqueKeys<EntityT>,
  FindManySearchDtoT extends FindManySearchDto<EntityT> = DtoFindManySearch<EntityT>,
  FindManyRelationsDtoT extends FindManyRelationsDto<EntityT> = FindManyRelationsDto<EntityT>,
  FindManyRangesDateDtoT extends FindManyRangesDto<EntityT> = FindManyRangesDto<EntityT>,
  FindManyRangesNumberDtoT extends FindManyRangesDto<EntityT> = FindManyRangesDto<EntityT>,
  FindManyRangesStringDtoT extends FindManyRangesDto<EntityT> = FindManyRangesDto<EntityT>,
  SortByT extends keyof EntityT = keyof EntityT,
> {
  @ValidateNested()
  uniqueKeys?: FindManyUniqueKeysDtoT;

  @ValidateNested()
  @IsOptional()
  search?: FindManySearchDtoT;

  @ValidateNested()
  @IsOptional()
  relations?: FindManyRelationsDtoT;

  @ValidateNested()
  @IsOptional()
  dateRanges?: FindManyRangesDateDtoT;

  @ValidateNested()
  @IsOptional()
  numberRanges?: FindManyRangesNumberDtoT;

  @ValidateNested()
  @IsOptional()
  stringRanges?: FindManyRangesStringDtoT;

  @IsString()
  @IsOptional()
  sortBy?: SortByT;

  @IsString()
  @IsOptional()
  sortOrder?: FindManySortOrder;

  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  resultsPerPage?: number;
}

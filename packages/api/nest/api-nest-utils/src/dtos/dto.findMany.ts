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
  FindManySearchDto,
  FindManyUniqueKeysDto,
} from '../types/types.requests';

export class DtoFindMany<
  EntityT extends RequestEntity = RequestEntity,
  FindManyUniqueKeysDtoT extends FindManyUniqueKeysDto<EntityT> = FindManyUniqueKeysDto<EntityT>,
  FindManySearchDtoT extends FindManySearchDto<EntityT> = FindManySearchDto<EntityT>,
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

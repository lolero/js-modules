import { IsOptional, ValidateNested } from 'class-validator';
import { Transform } from 'class-transformer';
import type {
  RequestEntity,
  FindManyRangesDto,
  FindManyRelationsDto,
  FindManySearchDto,
  FindManyUniqueKeysDto,
  FindManyBooleansDto,
  FindManyOrderDto,
} from '../types/types.requests';
import { DtoFindManyPagination } from './dto.findManyPagination';
import { utilParseDtoJsonStringWithQuotes } from '../utils/util.parseDtoJsonStringWithQuotes';

export class DtoFindMany<
  EntityT extends RequestEntity = RequestEntity,
  FindManyUniqueKeysDtoT extends FindManyUniqueKeysDto<EntityT> = FindManyUniqueKeysDto<EntityT>,
  FindManySearchDtoT extends FindManySearchDto<EntityT> = FindManySearchDto<EntityT>,
  FindManyRelationsDtoT extends FindManyRelationsDto<EntityT> = FindManyRelationsDto<EntityT>,
  FindManyRangesDateDtoT extends FindManyRangesDto<EntityT> = FindManyRangesDto<EntityT>,
  FindManyRangesNumberDtoT extends FindManyRangesDto<EntityT> = FindManyRangesDto<EntityT>,
  FindManyRangesStringDtoT extends FindManyRangesDto<EntityT> = FindManyRangesDto<EntityT>,
  FindManyBooleansDtoT extends FindManyBooleansDto<EntityT> = FindManyBooleansDto<EntityT>,
  FindManyOrderDtoT extends FindManyOrderDto<EntityT> = FindManyOrderDto<EntityT>,
> {
  @Transform(utilParseDtoJsonStringWithQuotes<FindManyUniqueKeysDtoT>)
  // @ValidateNested()
  @IsOptional()
  uniqueKeys?: FindManyUniqueKeysDtoT;

  @Transform(utilParseDtoJsonStringWithQuotes<FindManySearchDtoT>)
  // @ValidateNested()
  @IsOptional()
  search?: FindManySearchDtoT;

  @Transform(utilParseDtoJsonStringWithQuotes<FindManyRelationsDtoT>)
  // @ValidateNested()
  @IsOptional()
  relations?: FindManyRelationsDtoT;

  @Transform(utilParseDtoJsonStringWithQuotes<FindManyRangesDateDtoT>)
  // @ValidateNested()
  @IsOptional()
  dateRanges?: FindManyRangesDateDtoT;

  @Transform(utilParseDtoJsonStringWithQuotes<FindManyRangesNumberDtoT>)
  // @ValidateNested()
  @IsOptional()
  numberRanges?: FindManyRangesNumberDtoT;

  @Transform(utilParseDtoJsonStringWithQuotes<FindManyRangesStringDtoT>)
  // @ValidateNested()
  @IsOptional()
  stringRanges?: FindManyRangesStringDtoT;

  @Transform(utilParseDtoJsonStringWithQuotes<FindManyBooleansDtoT>)
  // @ValidateNested()
  @IsOptional()
  booleans?: FindManyBooleansDtoT;

  @Transform(utilParseDtoJsonStringWithQuotes<FindManyOrderDtoT>)
  // @ValidateNested()
  @IsOptional()
  order?: FindManyOrderDtoT;

  @Transform(utilParseDtoJsonStringWithQuotes<DtoFindManyPagination>)
  // @ValidateNested()
  @IsOptional()
  pagination?: DtoFindManyPagination;
}

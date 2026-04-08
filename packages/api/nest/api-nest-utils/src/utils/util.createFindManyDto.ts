import { Transform } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { DtoFindManyPagination } from '../dtos/dto.findManyPagination';
import {
  FindManyBooleansDto,
  FindManyDto,
  FindManyOrderItemDto,
  FindManyRangesDto,
  FindManyRelationsDto,
  FindManySearchDto,
  FindManyUniqueKeysDto,
  RequestEntity,
} from '../types/types.requests';
import { utilTransformFindManyDtoField } from './util.transformFindManyDtoField';

type InitClass<FindManyDtoClassT> = { new (): FindManyDtoClassT };

export function utilCreateFindManyDto<
  EntityT extends RequestEntity,
  FindManyUniqueKeysDtoT extends FindManyUniqueKeysDto<EntityT>,
  FindManySearchDtoT extends FindManySearchDto<EntityT>,
  FindManyRelationsDtoT extends FindManyRelationsDto<EntityT>,
  FindManyRangesDateDtoT extends FindManyRangesDto<EntityT>,
  FindManyRangesNumberDtoT extends FindManyRangesDto<EntityT>,
  FindManyRangesStringDtoT extends FindManyRangesDto<EntityT>,
  FindManyBooleansDtoT extends FindManyBooleansDto<EntityT>,
  FindManyOrderItemDtoT extends FindManyOrderItemDto<EntityT>,
>(
  _entity: InitClass<EntityT>,
  FindManyUniqueKeysDtoClass?: InitClass<FindManyUniqueKeysDtoT>,
  FindManySearchDtoClass?: InitClass<FindManySearchDtoT>,
  FindManyRelationsDtoClass?: InitClass<FindManyRelationsDtoT>,
  FindManyRangesDateDtoClass?: InitClass<FindManyRangesDateDtoT>,
  FindManyRangesNumberDtoClass?: InitClass<FindManyRangesNumberDtoT>,
  FindManyRangesStringDtoClass?: InitClass<FindManyRangesStringDtoT>,
  FindManyBooleansDtoClass?: InitClass<FindManyBooleansDtoT>,
  FindManyOrderItemDtoClass?: InitClass<FindManyOrderItemDtoT>,
): {
  new (): {
    uniqueKeys?: FindManyUniqueKeysDtoT;
    search?: FindManySearchDtoT;
    relations?: FindManyRelationsDtoT;
    dateRanges?: FindManyRangesDateDtoT;
    numberRanges?: FindManyRangesNumberDtoT;
    stringRanges?: FindManyRangesStringDtoT;
    booleans?: FindManyBooleansDtoT;
    order?: FindManyOrderItemDtoT[];
    pagination?: DtoFindManyPagination;
  };
} {
  class FindManyDtoClass implements FindManyDto<EntityT> {
    @Transform((params) =>
      utilTransformFindManyDtoField(params, FindManyUniqueKeysDtoClass),
    )
    @ValidateNested()
    @IsOptional()
    uniqueKeys?: FindManyUniqueKeysDtoT;

    @Transform((params) =>
      utilTransformFindManyDtoField(params, FindManySearchDtoClass),
    )
    @ValidateNested()
    @IsOptional()
    search?: FindManySearchDtoT;

    @Transform((params) =>
      utilTransformFindManyDtoField(params, FindManyRelationsDtoClass),
    )
    @ValidateNested()
    @IsOptional()
    relations?: FindManyRelationsDtoT;

    @Transform((params) =>
      utilTransformFindManyDtoField(params, FindManyRangesDateDtoClass),
    )
    @ValidateNested()
    @IsOptional()
    dateRanges?: FindManyRangesDateDtoT;

    @Transform((params) =>
      utilTransformFindManyDtoField(params, FindManyRangesNumberDtoClass),
    )
    @ValidateNested()
    @IsOptional()
    numberRanges?: FindManyRangesNumberDtoT;

    @Transform((params) =>
      utilTransformFindManyDtoField(params, FindManyRangesStringDtoClass),
    )
    @ValidateNested()
    @IsOptional()
    stringRanges?: FindManyRangesStringDtoT;

    @Transform((params) =>
      utilTransformFindManyDtoField(params, FindManyBooleansDtoClass),
    )
    @ValidateNested()
    @IsOptional()
    booleans?: FindManyBooleansDtoT;

    @Transform((params) =>
      utilTransformFindManyDtoField(params, FindManyOrderItemDtoClass),
    )
    @IsArray()
    @ValidateNested({ each: true })
    @IsOptional()
    order?: FindManyOrderItemDtoT[];

    @Transform((params) =>
      utilTransformFindManyDtoField(params, DtoFindManyPagination),
    )
    @ValidateNested()
    @IsOptional()
    pagination?: DtoFindManyPagination;
  }

  return FindManyDtoClass;
}

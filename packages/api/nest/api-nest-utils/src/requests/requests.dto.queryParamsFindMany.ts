import {
  IsInt,
  IsOptional,
  IsString,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';
import type { SortOrder } from './requests.types';
import { ValidatorIsNumberStringOrNull } from '../validators/validator.isNumberStringOrNull';

// TODO: add FindManyForeignKeysDtoT, FindManyNumberRangesDtoT,
//  FindManyDateRangesDtoT,
export class RequestsDtoQueryParamsFindMany<FindManyUniqueKeysDtoT, SortByT> {
  @ValidateNested()
  uniqueKeys?: FindManyUniqueKeysDtoT;

  @Validate(ValidatorIsNumberStringOrNull, { each: true })
  @IsOptional()
  createdAtRange?: [number | string | null, number | string | null];

  @Validate(ValidatorIsNumberStringOrNull, { each: true })
  @IsOptional()
  updatedAtRange?: [number | string | null, number | string | null];

  @Validate(ValidatorIsNumberStringOrNull, { each: true })
  @IsOptional()
  deletedAtRange?: [number | string | null, number | string | null];

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  sortBy?: SortByT;

  @IsString()
  @IsOptional()
  sortOrder?: SortOrder;

  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  resultsPerPage?: number;
}

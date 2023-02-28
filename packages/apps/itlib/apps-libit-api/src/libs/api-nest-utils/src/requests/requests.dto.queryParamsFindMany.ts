import {
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import type { SortOrder } from './requests.types';

export class RequestsDtoQueryParamsFindMany<FindManyUniqueKeysDtoT, SortByT> {
  @ValidateNested()
  uniqueKeys?: FindManyUniqueKeysDtoT;

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

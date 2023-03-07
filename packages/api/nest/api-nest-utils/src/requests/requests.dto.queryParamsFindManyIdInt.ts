import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import type { SortOrder } from './requests.types';

export class RequestsDtoQueryParamsFindManyIdInt<SortByT> {
  @IsInt({ each: true })
  @IsOptional()
  ids?: number[];

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

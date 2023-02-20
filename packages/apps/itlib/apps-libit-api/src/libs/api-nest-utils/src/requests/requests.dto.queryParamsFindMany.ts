import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import type {
  RequestsQueryParamsFindMany,
  SortOrder,
} from '../types/types.requests.queryParams';

export class RequestsDtoQueryParamsFindMany<SortByT extends string>
  implements RequestsQueryParamsFindMany<SortByT>
{
  @IsString({ each: true })
  @IsOptional()
  ids?: string[];

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

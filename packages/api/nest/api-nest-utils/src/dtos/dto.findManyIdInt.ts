import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import type { FindManySortOrder } from '../types/types.requests';

export class DtoFindManyIdInt<SortByT> {
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

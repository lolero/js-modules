import { IsInt, Min } from 'class-validator';
import { FindManyPaginationDto } from '../types/types.requests';

export class DtoFindManyPagination implements FindManyPaginationDto {
  @IsInt()
  @Min(1)
  pageNumber: number;

  @IsInt()
  @Min(1)
  resultsPerPage: number;
}

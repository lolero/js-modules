import { IsInt, Min } from 'class-validator';

export class DtoFindManyPagination {
  @IsInt()
  @Min(1)
  pageNumber: number;

  @IsInt()
  @Min(1)
  resultsPerPage: number;
}

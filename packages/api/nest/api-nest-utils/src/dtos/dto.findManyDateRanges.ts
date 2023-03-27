import { IsOptional } from 'class-validator';
import { isFindManyRange } from '../validators/validator.isFindManyRange';
import { FindManyRange } from '../types/types.requests';

export class DtoFindManyDateRanges {
  @isFindManyRange()
  @IsOptional()
  createdAt?: FindManyRange;

  @isFindManyRange()
  @IsOptional()
  updatedAt?: FindManyRange;
}

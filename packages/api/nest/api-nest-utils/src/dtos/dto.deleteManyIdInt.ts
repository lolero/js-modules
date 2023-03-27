import { IsInt } from 'class-validator';

export class DtoDeleteManyIdInt {
  @IsInt({ each: true })
  ids: number[];
}

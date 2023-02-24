import { IsInt } from 'class-validator';

export class RequestsDtoBodyDeleteManyIdInt {
  @IsInt({ each: true })
  ids: number[];
}

import { IsString } from 'class-validator';

export class RequestsDtoBodyDeleteManyIdStr {
  @IsString({ each: true })
  ids: string[];
}

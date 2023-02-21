import { IsString } from 'class-validator';

export class RequestsDtoBodyDeleteMany {
  @IsString({ each: true })
  ids: (string | number)[];
}

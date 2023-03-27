import { IsString } from 'class-validator';

export class DtoDeleteManyIdStr {
  @IsString({ each: true })
  ids: string[];
}

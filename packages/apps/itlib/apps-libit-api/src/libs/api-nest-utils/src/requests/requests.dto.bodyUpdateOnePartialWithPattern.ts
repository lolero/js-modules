import { IsString } from 'class-validator';

export class RequestsDtoBodyUpdateOnePartialWithPattern<
  EntityTypeT extends { id: number | string },
  DtoUpdateOnePartialT,
> {
  @IsString({ each: true })
  ids: EntityTypeT['id'][];

  dtoUpdateOnePartial: DtoUpdateOnePartialT;
}

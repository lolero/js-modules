import { IsInt } from 'class-validator';

export class RequestsDtoBodyUpdateOnePartialWithPatternIdInt<
  DtoUpdateOnePartialT,
> {
  @IsInt({ each: true })
  ids: number[];

  dtoUpdateOnePartial: DtoUpdateOnePartialT;
}

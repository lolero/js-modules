import { IsString } from 'class-validator';

export class RequestsDtoBodyUpdateOnePartialWithPatternIdStr<
  DtoUpdateOnePartialT,
> {
  @IsString({ each: true })
  ids: string[];

  dtoUpdateOnePartial: DtoUpdateOnePartialT;
}

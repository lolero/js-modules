import { IsString, ValidateNested } from 'class-validator';

export class RequestsDtoBodyUpdateOnePartialWithPatternIdStr<
  DtoUpdateOnePartialT,
> {
  @IsString({ each: true })
  ids: string[];

  @ValidateNested()
  dtoUpdateOnePartial: DtoUpdateOnePartialT;
}

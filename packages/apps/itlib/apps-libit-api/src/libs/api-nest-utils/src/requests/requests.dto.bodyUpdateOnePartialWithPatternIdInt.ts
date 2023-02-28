import { IsInt, ValidateNested } from 'class-validator';

export class RequestsDtoBodyUpdateOnePartialWithPatternIdInt<
  DtoUpdateOnePartialT,
> {
  @IsInt({ each: true })
  ids: number[];

  @ValidateNested()
  dtoUpdateOnePartial: DtoUpdateOnePartialT;
}

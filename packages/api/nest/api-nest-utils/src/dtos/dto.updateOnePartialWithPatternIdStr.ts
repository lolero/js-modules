import { IsString, ValidateNested } from 'class-validator';

export class DtoUpdateOnePartialWithPatternIdStr<DtoUpdateOnePartialT> {
  @IsString({ each: true })
  ids: string[];

  @ValidateNested()
  dtoUpdateOnePartial: DtoUpdateOnePartialT;
}

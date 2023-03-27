import { IsInt, ValidateNested } from 'class-validator';

export class DtoUpdateOnePartialWithPatternIdInt<DtoUpdateOnePartialT> {
  @IsInt({ each: true })
  ids: number[];

  @ValidateNested()
  dtoUpdateOnePartial: DtoUpdateOnePartialT;
}

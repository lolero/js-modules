import { last } from 'lodash';
import { BadRequestException } from '@nestjs/common';

export function utilParseDtoStringJsonWithQuotes<DtoObjectT>(
  dtoJson: string,
): DtoObjectT {
  try {
    let dtoJsonClean = dtoJson;
    if (['"', "'"].includes(dtoJson[0])) {
      dtoJsonClean = dtoJsonClean.slice(1);
    }
    if (['"', "'"].includes(last(dtoJson)!)) {
      dtoJsonClean = dtoJsonClean.slice(0, -1);
    }

    const dtoJsonCleanParsed = JSON.parse(dtoJsonClean);
    return dtoJsonCleanParsed;
  } catch (error) {
    throw new BadRequestException('Invalid JSON format');
  }
}

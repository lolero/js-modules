import { BadRequestException } from '@nestjs/common';
import last from 'lodash/last';

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

    const dtoJsonCleanParsed = JSON.parse(dtoJsonClean) as DtoObjectT;
    return dtoJsonCleanParsed;
  } catch (error) {
    throw new BadRequestException(error, 'Invalid JSON format');
  }
}

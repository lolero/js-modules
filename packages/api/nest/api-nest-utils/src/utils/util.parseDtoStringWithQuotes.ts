import { last } from 'lodash';

export function utilParseDtoStringWithQuotes(dtoJson: string): string {
  let dtoJsonClean = dtoJson;
  if (['"', "'"].includes(dtoJson[0])) {
    dtoJsonClean = dtoJsonClean.slice(1);
  }
  if (['"', "'"].includes(last(dtoJson) as string)) {
    dtoJsonClean = dtoJsonClean.slice(0, -1);
  }

  return dtoJsonClean;
}

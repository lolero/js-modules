import sortBy from 'lodash/sortBy';
import { FindManyRange } from '../types/types.requests';

export function utilGetFindManyStringRange(
  from: FindManyRange[0],
  to: FindManyRange[1],
): [string, string] {
  const minValue = 'a';
  const maxValue = 'z';

  let strFrom: string;
  switch (typeof from) {
    case 'number':
      strFrom = String(from) ?? minValue;
      break;
    case 'string':
      strFrom = from;
      break;
    default:
      strFrom = minValue;
  }

  let strTo: string;
  switch (typeof to) {
    case 'number':
      strTo = String(to) ?? maxValue;
      break;
    case 'string':
      strTo = to;
      break;
    default:
      strTo = maxValue;
  }

  const strRange = [strFrom, strTo];
  const strRangeSorted = sortBy(strRange) as [string, string];

  return strRangeSorted;
}

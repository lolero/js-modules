import sortBy from 'lodash/sortBy';
import isNaN from 'lodash/isNaN';
import { FindManyRange } from '../types/types.requests';

export function utilGetFindManyNumberRange(
  from: FindManyRange[0],
  to: FindManyRange[1],
): [number, number] {
  const minValue = -Infinity;
  const maxValue = Infinity;

  let numberFrom: number;
  switch (typeof from) {
    case 'number':
      numberFrom = from;
      break;
    case 'string':
      numberFrom = Number(from) ?? minValue;
      break;
    default:
      numberFrom = minValue;
  }

  let numberTo: number;
  switch (typeof to) {
    case 'number':
      numberTo = to;
      break;
    case 'string':
      numberTo = Number(to) ?? maxValue;
      break;
    default:
      numberTo = maxValue;
  }

  const numberRange = [
    isNaN(numberFrom) ? minValue : numberFrom,
    isNaN(numberTo) ? maxValue : numberTo,
  ];
  const numberRangeSorted = sortBy(numberRange) as [number, number];

  return numberRangeSorted;
}

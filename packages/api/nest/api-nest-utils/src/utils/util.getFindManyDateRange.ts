import { MAX_DATE_MILLISECONDS } from '@js-modules/common-utils-general';
import sortBy from 'lodash/sortBy';
import { FindManyRange } from '../types/types.requests';

export function utilGetFindManyDateRange(
  from: FindManyRange[0],
  to: FindManyRange[1],
): [Date, Date] {
  const dateFrom = new Date(from ?? 0);
  const dateTo = new Date(to ?? MAX_DATE_MILLISECONDS);

  const dateRange = [dateFrom, dateTo];
  const dateRangeSorted = sortBy(dateRange) as [Date, Date];

  return dateRangeSorted;
}

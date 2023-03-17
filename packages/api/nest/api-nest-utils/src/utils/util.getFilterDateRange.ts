import { MAX_DATE_MILLISECONDS } from '@js-modules/common-utils-general';

export function utilsGetFilterDateRange(
  from: number | string | null,
  to: number | string | null,
): [Date, Date] {
  const dateFrom = new Date(from ?? 0);
  const dateTo = new Date(to ?? MAX_DATE_MILLISECONDS);
  return [dateFrom, dateTo];
}

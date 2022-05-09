import { addDays, lightFormat } from 'date-fns';

export function getDaysArrayInTimestampRange(
  fromTimestamp: string,
  toTimestamp: string,
): string[] {
  const daysArray: string[] = [];

  const fromDate = new Date(fromTimestamp);
  const toDate = new Date(toTimestamp);

  let currentDate = fromDate;
  while (currentDate <= toDate) {
    daysArray.push(lightFormat(currentDate, 'yyyy-MM-dd'));
    currentDate = addDays(currentDate, 1);
  }

  return daysArray;
}

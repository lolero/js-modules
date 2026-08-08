import { formatLocale } from 'd3-format';

const localeDe = formatLocale({
  decimal: ',',
  thousands: '.',
  grouping: [3],
  currency: ['', ' €'],
});

export function formatDe(
  specifier: string,
): (n: number | { valueOf(): number }) => string {
  return localeDe.format(specifier);
}

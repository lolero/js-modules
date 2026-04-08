import { formatLocale } from 'd3-format';

const deLocale = formatLocale({
  decimal: ',',
  thousands: '.',
  grouping: [3],
  currency: ['', ' €'],
});

export const formatDe = (specifier: string) => deLocale.format(specifier);

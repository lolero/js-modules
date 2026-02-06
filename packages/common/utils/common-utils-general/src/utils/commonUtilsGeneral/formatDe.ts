import { formatLocale } from 'd3-format';

export const formatDe = formatLocale({
  decimal: ',',
  thousands: '.',
  grouping: [3],
  currency: ['', ' €'],
}).format;

import { IconPrefix, IconStyle } from '@fortawesome/fontawesome-common-types';

export const iconStylesByPrefix: Partial<Record<IconPrefix, IconStyle>> = {
  fab: 'brand' as IconStyle,
  fad: 'duotone',
  fal: 'light',
  far: 'regular',
  fas: 'solid',
};

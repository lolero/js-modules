import { IconPrefix, IconStyle } from '@fortawesome/fontawesome-common-types';

export const iconTypesByPrefix: Partial<Record<IconPrefix, IconStyle>> = {
  fab: 'brands',
  fad: 'duotone',
  fal: 'light',
  far: 'regular',
  fas: 'solid',
};

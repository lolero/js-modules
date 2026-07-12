import type { Enum } from '@js-modules/common-utils-general';

export const Role = {
  User: 'user',
  Assistant: 'assistant',
  System: 'system',
  Pending: 'pending',
} as const;
export type Role = Enum<typeof Role>;

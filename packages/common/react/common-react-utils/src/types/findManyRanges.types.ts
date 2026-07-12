import type { Enum } from '@js-modules/common-utils-general';

export const FindManyRangeType = {
  date: 'date',
  number: 'number',
  string: 'string',
} as const;
export type FindManyRangeType = Enum<typeof FindManyRangeType>;

export type FindManyRangesTypes = Record<string, FindManyRangeType>;

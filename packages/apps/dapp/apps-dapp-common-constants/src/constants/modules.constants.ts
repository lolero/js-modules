import type { Enum } from '@js-modules/common-utils-general';

export const WebModulesPublic = {
  home: 'home',
  purpose: 'purpose',
} as const;
export type WebModulesPublic = Enum<typeof WebModulesPublic>;

export const WebModulesPrivate = {
  portfolio: 'portfolio',
  analytics: 'analytics',
} as const;
export type WebModulesPrivate = Enum<typeof WebModulesPrivate>;

export const WebSubModulesPortfolio = {
  tokens: 'tokens',
  transactions: 'transactions',
} as const;
export type WebSubModulesPortfolio = Enum<typeof WebSubModulesPortfolio>;

export const WebSubModulesAnalytics = {
  tokens: 'tokens',
  history: 'history',
  insights: 'insights',
} as const;
export type WebSubModulesAnalytics = Enum<typeof WebSubModulesAnalytics>;

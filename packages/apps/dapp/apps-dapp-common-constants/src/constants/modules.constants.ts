export enum Modules {
  portfolio = 'portfolio',
  analytics = 'analytics',
}

export enum SubModulesPortfolio {
  tokens = 'tokens',
  transactions = 'transactions',
}

export enum SubModulesAnalytics {
  tokens = 'tokens',
  history = 'history',
  insights = 'insights',
}

export const modulePaths: Record<
  Modules | SubModulesPortfolio | SubModulesAnalytics,
  string
> = {
  [Modules.portfolio]: `/${Modules.portfolio}`,
  [SubModulesPortfolio.tokens]: `/${Modules.portfolio}/${SubModulesPortfolio.tokens}`,
  [SubModulesPortfolio.transactions]: `/${Modules.portfolio}/${SubModulesPortfolio.transactions}`,
  [Modules.analytics]: `/${Modules.analytics}`,
  [SubModulesAnalytics.tokens]: `/${Modules.portfolio}/${SubModulesPortfolio.tokens}`,
  [SubModulesAnalytics.history]: `/${Modules.analytics}/${SubModulesAnalytics.history}`,
  [SubModulesAnalytics.insights]: `/${Modules.analytics}/${SubModulesAnalytics.insights}`,
};

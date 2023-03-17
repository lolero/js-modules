import { RoutesMetadata } from '@js-modules/web-react-nav';
import {
  Modules,
  SubModulesAnalytics,
  SubModulesPortfolio,
} from '@js-modules/apps-dapp-common-constants';
import upperFirst from 'lodash/upperFirst';
import { faChartPie } from '@fortawesome/free-solid-svg-icons/faChartPie';
import { faCoins } from '@fortawesome/free-solid-svg-icons/faCoins';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons/faMoneyBillTransfer';
import { faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlassChart';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons/faClockRotateLeft';
import { faWaveSquare } from '@fortawesome/free-solid-svg-icons/faWaveSquare';

export const dappRoutesMetadata: RoutesMetadata = {
  [Modules.portfolio]: {
    path: `/${Modules.portfolio}`,
    icon: faChartPie,
    label: upperFirst(Modules.portfolio),
    subRoutes: {
      [SubModulesPortfolio.tokens]: {
        path: `/${Modules.portfolio}/${SubModulesPortfolio.tokens}`,
        icon: faCoins,
        label: upperFirst(SubModulesPortfolio.tokens),
      },
      [SubModulesPortfolio.transactions]: {
        path: `/${Modules.portfolio}/${SubModulesPortfolio.transactions}`,
        icon: faMoneyBillTransfer,
        label: upperFirst(SubModulesPortfolio.transactions),
      },
    },
  },
  [Modules.analytics]: {
    path: `/${Modules.analytics}`,
    icon: faMagnifyingGlassChart,
    label: upperFirst(Modules.analytics),
    subRoutes: {
      [SubModulesAnalytics.tokens]: {
        path: `/${Modules.analytics}/${SubModulesPortfolio.tokens}`,
        icon: faCoins,
        label: upperFirst(SubModulesAnalytics.tokens),
      },
      [SubModulesAnalytics.history]: {
        path: `/${Modules.analytics}/${SubModulesAnalytics.history}`,
        icon: faClockRotateLeft,
        label: upperFirst(SubModulesAnalytics.history),
      },
      [SubModulesAnalytics.insights]: {
        path: `/${Modules.analytics}/${SubModulesAnalytics.insights}`,
        icon: faWaveSquare,
        label: upperFirst(SubModulesAnalytics.insights),
      },
    },
  },
};

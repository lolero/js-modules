import { RoutesMetadata } from '@js-modules/common-react-nav';
import upperFirst from 'lodash/upperFirst';
import {
  WebModules,
  WebSubModulesAnalytics,
  WebSubModulesPortfolio,
} from '@js-modules/apps-dapp-common-constants';
import { faChartPie } from '@fortawesome/free-solid-svg-icons/faChartPie';
import { faCoins } from '@fortawesome/free-solid-svg-icons/faCoins';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons/faMoneyBillTransfer';
import { faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlassChart';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons/faClockRotateLeft';
import { faWaveSquare } from '@fortawesome/free-solid-svg-icons/faWaveSquare';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

export const routesMetadataDapp: RoutesMetadata<IconDefinition> = {
  [WebModules.portfolio]: {
    path: `/${WebModules.portfolio}`,
    icon: faChartPie,
    label: upperFirst(WebModules.portfolio),
    subRoutes: {
      [WebSubModulesPortfolio.tokens]: {
        path: `/${WebModules.portfolio}/${WebSubModulesPortfolio.tokens}`,
        icon: faCoins,
        label: upperFirst(WebSubModulesPortfolio.tokens),
      },
      [WebSubModulesPortfolio.transactions]: {
        path: `/${WebModules.portfolio}/${WebSubModulesPortfolio.transactions}`,
        icon: faMoneyBillTransfer,
        label: upperFirst(WebSubModulesPortfolio.transactions),
      },
    },
  },
  [WebModules.analytics]: {
    path: `/${WebModules.analytics}`,
    icon: faMagnifyingGlassChart,
    label: upperFirst(WebModules.analytics),
    subRoutes: {
      [WebSubModulesAnalytics.tokens]: {
        path: `/${WebModules.analytics}/${WebSubModulesPortfolio.tokens}`,
        icon: faCoins,
        label: upperFirst(WebSubModulesAnalytics.tokens),
      },
      [WebSubModulesAnalytics.history]: {
        path: `/${WebModules.analytics}/${WebSubModulesAnalytics.history}`,
        icon: faClockRotateLeft,
        label: upperFirst(WebSubModulesAnalytics.history),
      },
      [WebSubModulesAnalytics.insights]: {
        path: `/${WebModules.analytics}/${WebSubModulesAnalytics.insights}`,
        icon: faWaveSquare,
        label: upperFirst(WebSubModulesAnalytics.insights),
      },
    },
  },
};

import { RoutesMetadata } from '@js-modules/common-react-nav';
import upperFirst from 'lodash/upperFirst';
import lowerCase from 'lodash/lowerCase';
import {
  WebModulesPrivate,
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

export const routesMetadataPrivate: RoutesMetadata<IconDefinition> = {
  [WebModulesPrivate.portfolio]: {
    path: `/${WebModulesPrivate.portfolio}`,
    icon: faChartPie,
    label: upperFirst(lowerCase(WebModulesPrivate.portfolio)),
    subRoutes: {
      [WebSubModulesPortfolio.tokens]: {
        path: `/${WebModulesPrivate.portfolio}/${WebSubModulesPortfolio.tokens}`,
        icon: faCoins,
        label: upperFirst(lowerCase(WebSubModulesPortfolio.tokens)),
      },
      [WebSubModulesPortfolio.transactions]: {
        path: `/${WebModulesPrivate.portfolio}/${WebSubModulesPortfolio.transactions}`,
        icon: faMoneyBillTransfer,
        label: upperFirst(lowerCase(WebSubModulesPortfolio.transactions)),
      },
    },
  },
  [WebModulesPrivate.analytics]: {
    path: `/${WebModulesPrivate.analytics}`,
    icon: faMagnifyingGlassChart,
    label: upperFirst(lowerCase(WebModulesPrivate.analytics)),
    subRoutes: {
      [WebSubModulesAnalytics.tokens]: {
        path: `/${WebModulesPrivate.analytics}/${WebSubModulesPortfolio.tokens}`,
        icon: faCoins,
        label: upperFirst(lowerCase(WebSubModulesAnalytics.tokens)),
      },
      [WebSubModulesAnalytics.history]: {
        path: `/${WebModulesPrivate.analytics}/${WebSubModulesAnalytics.history}`,
        icon: faClockRotateLeft,
        label: upperFirst(lowerCase(WebSubModulesAnalytics.history)),
      },
      [WebSubModulesAnalytics.insights]: {
        path: `/${WebModulesPrivate.analytics}/${WebSubModulesAnalytics.insights}`,
        icon: faWaveSquare,
        label: upperFirst(lowerCase(WebSubModulesAnalytics.insights)),
      },
    },
  },
};

import {
  modulePaths,
  Modules,
  SubModulesAnalytics,
  SubModulesPortfolio,
} from '@js-modules/apps-dapp-common-constants';
import { faChartPie } from '@fortawesome/free-solid-svg-icons/faChartPie';
import upperFirst from 'lodash/upperFirst';
import { faCoins } from '@fortawesome/free-solid-svg-icons/faCoins';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons/faMoneyBillTransfer';
import { faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlassChart';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons/faClockRotateLeft';
import { faWaveSquare } from '@fortawesome/free-solid-svg-icons/faWaveSquare';
import { NavLeftDrawerTabsMetadata } from '@js-modules/web-react-nav';

export const dappNavDrawerTabsMetadata: NavLeftDrawerTabsMetadata = {
  [Modules.portfolio]: {
    tabPath: modulePaths[Modules.portfolio],
    icon: faChartPie,
    label: upperFirst(Modules.portfolio),
    subTabs: {
      [SubModulesPortfolio.tokens]: {
        tabPath: modulePaths[SubModulesPortfolio.tokens],
        icon: faCoins,
        label: upperFirst(SubModulesPortfolio.tokens),
      },
      [SubModulesPortfolio.transactions]: {
        tabPath: modulePaths[SubModulesPortfolio.transactions],
        icon: faMoneyBillTransfer,
        label: upperFirst(SubModulesPortfolio.transactions),
      },
    },
  },
  [Modules.analytics]: {
    tabPath: modulePaths[Modules.analytics],
    icon: faMagnifyingGlassChart,
    label: upperFirst(Modules.analytics),
    subTabs: {
      [SubModulesAnalytics.tokens]: {
        tabPath: `/${Modules.analytics}/${SubModulesAnalytics.tokens}`,
        icon: faCoins,
        label: upperFirst(SubModulesAnalytics.tokens),
      },
      [SubModulesAnalytics.history]: {
        tabPath: modulePaths[SubModulesAnalytics.history],
        icon: faClockRotateLeft,
        label: upperFirst(SubModulesAnalytics.history),
      },
      [SubModulesAnalytics.insights]: {
        tabPath: modulePaths[SubModulesAnalytics.insights],
        icon: faWaveSquare,
        label: upperFirst(SubModulesAnalytics.insights),
      },
    },
  },
};

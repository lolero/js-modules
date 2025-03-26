import { RoutesMetadata } from '@js-modules/web-react-nav';
import { MuiFaIcon } from '@js-modules/web-react-components';
import upperFirst from 'lodash/upperFirst';
import React from 'react';
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

export const routesMetadataDapp: RoutesMetadata = {
  [WebModules.portfolio]: {
    path: `/${WebModules.portfolio}`,
    icon: <MuiFaIcon icon={faChartPie} />,
    label: upperFirst(WebModules.portfolio),
    subRoutes: {
      [WebSubModulesPortfolio.tokens]: {
        path: `/${WebModules.portfolio}/${WebSubModulesPortfolio.tokens}`,
        icon: <MuiFaIcon icon={faCoins} />,
        label: upperFirst(WebSubModulesPortfolio.tokens),
      },
      [WebSubModulesPortfolio.transactions]: {
        path: `/${WebModules.portfolio}/${WebSubModulesPortfolio.transactions}`,
        icon: <MuiFaIcon icon={faMoneyBillTransfer} />,
        label: upperFirst(WebSubModulesPortfolio.transactions),
      },
    },
  },
  [WebModules.analytics]: {
    path: `/${WebModules.analytics}`,
    icon: <MuiFaIcon icon={faMagnifyingGlassChart} />,
    label: upperFirst(WebModules.analytics),
    subRoutes: {
      [WebSubModulesAnalytics.tokens]: {
        path: `/${WebModules.analytics}/${WebSubModulesPortfolio.tokens}`,
        icon: <MuiFaIcon icon={faCoins} />,
        label: upperFirst(WebSubModulesAnalytics.tokens),
      },
      [WebSubModulesAnalytics.history]: {
        path: `/${WebModules.analytics}/${WebSubModulesAnalytics.history}`,
        icon: <MuiFaIcon icon={faClockRotateLeft} />,
        label: upperFirst(WebSubModulesAnalytics.history),
      },
      [WebSubModulesAnalytics.insights]: {
        path: `/${WebModules.analytics}/${WebSubModulesAnalytics.insights}`,
        icon: <MuiFaIcon icon={faWaveSquare} />,
        label: upperFirst(WebSubModulesAnalytics.insights),
      },
    },
  },
};

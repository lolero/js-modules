import { faChartPie } from '@fortawesome/free-solid-svg-icons/faChartPie';
import upperFirst from 'lodash/upperFirst';
import { faCoins } from '@fortawesome/free-solid-svg-icons/faCoins';
import { NavLeftDrawerTabsMetadata } from '@js-modules/web-react-nav';
import {
  modulePaths,
  Modules,
  SubModulesHome,
} from '@js-modules/apps-travel-log-common-constants';

export const travelLogNavDrawerTabsMetadata: NavLeftDrawerTabsMetadata = {
  [Modules.home]: {
    tabPath: modulePaths[Modules.home],
    icon: faChartPie,
    label: upperFirst(Modules.home),
    subTabs: {
      [SubModulesHome.tokens]: {
        tabPath: modulePaths[SubModulesHome.subModule1],
        icon: faCoins,
        label: upperFirst(SubModulesHome.subModule1),
      },
      [SubModulesHome.tokens]: {
        tabPath: modulePaths[SubModulesHome.subModule2],
        icon: faCoins,
        label: upperFirst(SubModulesHome.subModule2),
      },
    },
  },
};

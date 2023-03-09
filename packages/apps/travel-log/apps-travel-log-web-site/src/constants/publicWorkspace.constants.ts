import upperFirst from 'lodash/upperFirst';
import { faHandsHoldingCircle } from '@fortawesome/free-solid-svg-icons/faHandsHoldingCircle';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { NavLeftDrawerTabsMetadata } from '@js-modules/web-react-nav';
import {
  PublicModules,
  publicModulesPaths,
} from '@js-modules/apps-travel-log-common-constants';

export const publicWorkspaceNavDrawerTabsMetadata: NavLeftDrawerTabsMetadata = {
  [PublicModules.home]: {
    tabPath: publicModulesPaths[PublicModules.home],
    icon: faHouse,
    label: upperFirst(PublicModules.home),
  },
  [PublicModules.purpose]: {
    tabPath: publicModulesPaths[PublicModules.purpose],
    icon: faHandsHoldingCircle,
    label: upperFirst(PublicModules.purpose),
  },
};

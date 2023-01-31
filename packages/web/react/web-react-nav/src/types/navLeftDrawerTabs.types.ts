import {
  Modules,
  SubModulesAnalytics,
  SubModulesPortfolio,
} from '@js-modules/apps-dapp-common-constants';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type NavLeftDrawerTabsMetadata = Record<
  Modules[number] | SubModulesPortfolio[number] | SubModulesAnalytics[number],
  NavLeftDrawerTabMetadata
>;

export type NavLeftDrawerTabMetadata = {
  tabPath: string;
  icon: IconDefinition;
  label: string;
  subTabs?: NavLeftDrawerTabsMetadata;
};

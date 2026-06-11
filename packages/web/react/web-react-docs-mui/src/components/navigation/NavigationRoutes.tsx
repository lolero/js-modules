import type React from 'react';
import {
  WebModules,
  WebSubModulesNavigation,
} from '../../constants/modules.constants';
import { DocsMuiModuleRoutes } from '../DocsMuiModuleRoutes';
import { BottomNavigationBox } from './BottomNavigationBox';
import { BreadcrumbsBox } from './BreadcrumbsBox';
import { DrawerBox } from './DrawerBox';
import { LinkBox } from './LinkBox';
import { MenubarBox } from './MenubarBox';
import { MenuBox } from './MenuBox';
import { PaginationBox } from './PaginationBox';
import { SpeedDialBox } from './SpeedDialBox';
import { StepperBox } from './StepperBox';
import { TabsBox } from './TabsBox';

const subModuleBoxes: Record<WebSubModulesNavigation, React.ReactNode> = {
  [WebSubModulesNavigation.bottomNavigation]: <BottomNavigationBox />,
  [WebSubModulesNavigation.breadcrumbs]: <BreadcrumbsBox />,
  [WebSubModulesNavigation.drawer]: <DrawerBox />,
  [WebSubModulesNavigation.link]: <LinkBox />,
  [WebSubModulesNavigation.menu]: <MenuBox />,
  [WebSubModulesNavigation.menubar]: <MenubarBox />,
  [WebSubModulesNavigation.pagination]: <PaginationBox />,
  [WebSubModulesNavigation.speedDial]: <SpeedDialBox />,
  [WebSubModulesNavigation.stepper]: <StepperBox />,
  [WebSubModulesNavigation.tabs]: <TabsBox />,
};

export function NavigationRoutes(): React.ReactNode {
  return (
    <DocsMuiModuleRoutes
      webModule={WebModules.navigation}
      subModuleBoxes={subModuleBoxes}
    />
  );
}

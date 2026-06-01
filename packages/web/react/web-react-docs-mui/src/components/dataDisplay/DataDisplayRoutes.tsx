import type React from 'react';
import {
  WebModules,
  WebSubModulesDataDisplay,
} from '../../constants/modules.constants';
import { DocsMuiModuleRoutes } from '../DocsMuiModuleRoutes';
import { AvatarBox } from './AvatarBox';
import { BadgeBox } from './BadgeBox';
import { ChipBox } from './ChipBox';
import { DividerBox } from './DividerBox';
import { IconBox } from './IconBox';
import { ListBox } from './ListBox';
import { TableBox } from './TableBox';
import { TooltipBox } from './TooltipBox';
import { TypographyBox } from './TypographyBox';

const subModuleBoxes: Record<WebSubModulesDataDisplay, React.ReactNode> = {
  [WebSubModulesDataDisplay.avatar]: <AvatarBox />,
  [WebSubModulesDataDisplay.badge]: <BadgeBox />,
  [WebSubModulesDataDisplay.chip]: <ChipBox />,
  [WebSubModulesDataDisplay.divider]: <DividerBox />,
  [WebSubModulesDataDisplay.icon]: <IconBox />,
  [WebSubModulesDataDisplay.list]: <ListBox />,
  [WebSubModulesDataDisplay.table]: <TableBox />,
  [WebSubModulesDataDisplay.tooltip]: <TooltipBox />,
  [WebSubModulesDataDisplay.typography]: <TypographyBox />,
};

export function DataDisplayRoutes(): React.ReactNode {
  return (
    <DocsMuiModuleRoutes
      webModule={WebModules.dataDisplay}
      subModuleBoxes={subModuleBoxes}
    />
  );
}

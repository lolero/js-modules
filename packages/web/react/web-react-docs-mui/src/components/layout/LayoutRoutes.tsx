import type React from 'react';
import {
  WebModules,
  WebSubModulesLayout,
} from '../../constants/modules.constants';
import { DocsMuiModuleRoutes } from '../DocsMuiModuleRoutes';
import { ContainerBox } from './ContainerBox';
import { GridBox } from './GridBox';
import { ImageListBox } from './ImageListBox';
import { StackBox } from './StackBox';

const subModuleBoxes: Record<WebSubModulesLayout, React.ReactNode> = {
  [WebSubModulesLayout.container]: <ContainerBox />,
  [WebSubModulesLayout.grid]: <GridBox />,
  [WebSubModulesLayout.stack]: <StackBox />,
  [WebSubModulesLayout.imageList]: <ImageListBox />,
};

export function LayoutRoutes(): React.ReactNode {
  return (
    <DocsMuiModuleRoutes
      webModule={WebModules.layout}
      subModuleBoxes={subModuleBoxes}
    />
  );
}

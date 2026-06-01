import type React from 'react';
import {
  WebModules,
  WebSubModulesSurfaces,
} from '../../constants/modules.constants';
import { DocsMuiModuleRoutes } from '../DocsMuiModuleRoutes';
import { AccordionBox } from './AccordionBox';
import { AppBarBox } from './AppBarBox';
import { CardBox } from './CardBox';
import { PaperBox } from './PaperBox';

const subModuleBoxes: Record<WebSubModulesSurfaces, React.ReactNode> = {
  [WebSubModulesSurfaces.accordion]: <AccordionBox />,
  [WebSubModulesSurfaces.appBar]: <AppBarBox />,
  [WebSubModulesSurfaces.card]: <CardBox />,
  [WebSubModulesSurfaces.paper]: <PaperBox />,
};

export function SurfacesRoutes(): React.ReactNode {
  return (
    <DocsMuiModuleRoutes
      webModule={WebModules.surfaces}
      subModuleBoxes={subModuleBoxes}
    />
  );
}

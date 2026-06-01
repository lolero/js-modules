import type React from 'react';
import AnchorTemporaryDrawer from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/drawers/AnchorTemporaryDrawer';
import SwipeableTemporaryDrawer from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/drawers/SwipeableTemporaryDrawer';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Anchor',
    url: 'https://mui.com/material-ui/react-drawer/#anchor',
    example: <AnchorTemporaryDrawer />,
  },
  {
    name: 'Swipeable',
    url: 'https://mui.com/material-ui/react-drawer/#swipeable',
    example: <SwipeableTemporaryDrawer />,
  },
];

export function DrawerBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

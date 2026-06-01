import type React from 'react';
import BasicTabs from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/tabs/BasicTabs';
import CenteredTabs from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/tabs/CenteredTabs';
import ColorTabs from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/tabs/ColorTabs';
import DisabledTabs from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/tabs/DisabledTabs';
import FullWidthTabs from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/tabs/FullWidthTabs';
import IconLabelTabs from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/tabs/IconLabelTabs';
import IconPositionTabs from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/tabs/IconPositionTabs';
import IconTabs from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/tabs/IconTabs';
import ScrollableTabsButtonAuto from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/tabs/ScrollableTabsButtonAuto';
import TabsWrappedLabel from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/tabs/TabsWrappedLabel';
import VerticalTabs from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/tabs/VerticalTabs';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-tabs/#introduction',
    example: <BasicTabs />,
  },
  {
    name: 'Color',
    url: 'https://mui.com/material-ui/react-tabs/#colored-tab',
    example: <ColorTabs />,
  },
  {
    name: 'Disabled',
    url: 'https://mui.com/material-ui/react-tabs/#disabled-tab',
    example: <DisabledTabs />,
  },
  {
    name: 'Wrapped labels',
    url: 'https://mui.com/material-ui/react-tabs/#wrapped-labels',
    example: <TabsWrappedLabel />,
  },
  {
    name: 'Full-width',
    url: 'https://mui.com/material-ui/react-tabs/#full-width',
    example: <FullWidthTabs />,
  },
  {
    name: 'Centered',
    url: 'https://mui.com/material-ui/react-tabs/#centered',
    example: <CenteredTabs />,
  },
  {
    name: 'Scrollable',
    url: 'https://mui.com/material-ui/react-tabs/#scrollable-tabs',
    example: <ScrollableTabsButtonAuto />,
  },
  {
    name: 'Vertical',
    url: 'https://mui.com/material-ui/react-tabs/#vertical-tabs',
    example: <VerticalTabs />,
  },
  {
    name: 'Icon',
    url: 'https://mui.com/material-ui/react-tabs/#icon-tabs',
    example: <IconTabs />,
  },
  {
    name: 'Icon and label',
    url: 'https://mui.com/material-ui/react-tabs/#icon-tabs',
    example: <IconLabelTabs />,
  },
  {
    name: 'Icon position',
    url: 'https://mui.com/material-ui/react-tabs/#icon-position',
    example: <IconPositionTabs />,
  },
];

export function TabsBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

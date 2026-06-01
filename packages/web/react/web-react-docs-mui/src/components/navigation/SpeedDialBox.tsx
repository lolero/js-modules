import type React from 'react';
import BasicSpeedDial from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/speed-dial/BasicSpeedDial';
import OpenIconSpeedDial from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/speed-dial/OpenIconSpeedDial';
import PlaygroundSpeedDial from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/speed-dial/PlaygroundSpeedDial';
import SpeedDialTooltipOpen from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/speed-dial/SpeedDialTooltipOpen';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Playground',
    url: 'https://mui.com/material-ui/react-speed-dial/#playground',
    example: <PlaygroundSpeedDial />,
  },
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-speed-dial/#basic-speed-dial',
    example: <BasicSpeedDial />,
  },
  {
    name: 'Custom close icon',
    url: 'https://mui.com/material-ui/react-speed-dial/#custom-close-icon',
    example: <OpenIconSpeedDial />,
  },
  {
    name: 'Persistent action tooltips',
    url: 'https://mui.com/material-ui/react-speed-dial/#persistent-action-tooltips',
    example: <SpeedDialTooltipOpen />,
  },
];

export function SpeedDialBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

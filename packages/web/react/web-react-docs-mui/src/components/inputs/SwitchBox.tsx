import type React from 'react';
import BasicSwitches from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/switches/BasicSwitches';
import ColorSwitches from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/switches/ColorSwitches';
import FormControlLabelPosition from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/switches/FormControlLabelPosition';
import SwitchesSize from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/switches/SwitchesSize';
import SwitchLabels from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/switches/SwitchLabels';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-switch/#basic-switches',
    example: <BasicSwitches />,
  },
  {
    name: 'Label',
    url: 'https://mui.com/material-ui/react-switch/#label',
    example: <SwitchLabels />,
  },
  {
    name: 'Size',
    url: 'https://mui.com/material-ui/react-switch/#size',
    example: <SwitchesSize />,
  },
  {
    name: 'Color',
    url: 'https://mui.com/material-ui/react-switch/#color',
    example: <ColorSwitches />,
  },
  {
    name: 'Label placement',
    url: 'https://mui.com/material-ui/react-switch/#label-placement',
    example: <FormControlLabelPosition />,
  },
];

export function SwitchBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

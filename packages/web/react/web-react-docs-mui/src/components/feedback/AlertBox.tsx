import type React from 'react';
import ActionAlerts from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/alert/ActionAlerts';
import ColorAlerts from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/alert/ColorAlerts';
import DescriptionAlerts from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/alert/DescriptionAlerts';
import FilledAlerts from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/alert/FilledAlerts';
import IconAlerts from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/alert/IconAlerts';
import OutlinedAlerts from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/alert/OutlinedAlerts';
import SimpleAlert from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/alert/SimpleAlert';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-alert/#introduction',
    example: <SimpleAlert />,
  },
  {
    name: 'Severity',
    url: 'https://mui.com/material-ui/react-alert/#severity',
    example: <DescriptionAlerts />,
  },
  {
    name: 'Filled',
    url: 'https://mui.com/material-ui/react-alert/#variants',
    example: <FilledAlerts />,
  },
  {
    name: 'Outlined',
    url: 'https://mui.com/material-ui/react-alert/#variants',
    example: <OutlinedAlerts />,
  },
  {
    name: 'Color',
    url: 'https://mui.com/material-ui/react-alert/#color',
    example: <ColorAlerts />,
  },
  {
    name: 'Actions',
    url: 'https://mui.com/material-ui/react-alert/#actions',
    example: <ActionAlerts />,
  },
  {
    name: 'Icons',
    url: 'https://mui.com/material-ui/react-alert/#icons',
    example: <IconAlerts />,
  },
];

export function AlertBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

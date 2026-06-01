import type React from 'react';
import AutohideSnackbar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/snackbars/AutohideSnackbar';
import CustomizedSnackbars from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/snackbars/CustomizedSnackbars';
import LongTextSnackbar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/snackbars/LongTextSnackbar';
import PositionedSnackbar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/snackbars/PositionedSnackbar';
import SimpleSnackbar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/snackbars/SimpleSnackbar';
import TransitionsSnackbar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/snackbars/TransitionsSnackbar';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-snackbar/#introduction',
    example: <SimpleSnackbar />,
  },
  {
    name: 'Position',
    url: 'https://mui.com/material-ui/react-snackbar/#position',
    example: <PositionedSnackbar />,
  },
  {
    name: 'Content',
    url: 'https://mui.com/material-ui/react-snackbar/#content',
    example: <LongTextSnackbar />,
  },
  {
    name: 'Automatic hide',
    url: 'https://mui.com/material-ui/react-snackbar/#automatic-dismiss',
    example: <AutohideSnackbar />,
  },
  {
    name: 'Transition',
    url: 'https://mui.com/material-ui/react-snackbar/#transitions',
    example: <TransitionsSnackbar />,
  },
  {
    name: 'With alert',
    url: 'https://mui.com/material-ui/react-snackbar/#use-with-alerts',
    example: <CustomizedSnackbars />,
  },
];

export function SnackbarBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

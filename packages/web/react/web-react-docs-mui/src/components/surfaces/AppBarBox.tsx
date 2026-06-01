import type React from 'react';
import ButtonAppBar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/app-bar/ButtonAppBar';
import DenseAppBar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/app-bar/DenseAppBar';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-app-bar/#basic-app-bar',
    example: <ButtonAppBar />,
  },
  {
    name: 'Dense',
    url: 'https://mui.com/material-ui/react-app-bar/#dense-desktop-only',
    example: <DenseAppBar />,
  },
];

export function AppBarBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

import type React from 'react';
import FixedContainer from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/container/FixedContainer';
import SimpleContainer from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/container/SimpleContainer';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Fluid',
    url: 'https://mui.com/material-ui/react-container/#fluid',
    example: <SimpleContainer />,
  },
  {
    name: 'Fixed',
    url: 'https://mui.com/material-ui/react-container/#fixed',
    example: <FixedContainer />,
  },
];

export function ContainerBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

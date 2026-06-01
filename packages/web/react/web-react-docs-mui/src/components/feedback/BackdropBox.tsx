import type React from 'react';
import SimpleBackdrop from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/backdrop/SimpleBackdrop';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-backdrop/#example',
    example: <SimpleBackdrop />,
  },
];

export function BackdropBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

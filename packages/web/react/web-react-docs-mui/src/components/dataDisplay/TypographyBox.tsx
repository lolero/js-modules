import type React from 'react';
import Types from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/typography/Types';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Variants',
    url: 'https://mui.com/material-ui/react-typography/#usage',
    example: <Types />,
  },
];

export function TypographyBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

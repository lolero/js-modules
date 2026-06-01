import type React from 'react';
import Links from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/links/Links';
import UnderlineLink from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/links/UnderlineLink';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-link/#basic-links',
    example: <Links />,
  },
  {
    name: 'Underline',
    url: 'https://mui.com/material-ui/react-link/#underline',
    example: <UnderlineLink />,
  },
];

export function LinkBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

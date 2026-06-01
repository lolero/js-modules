import type React from 'react';
import FieldDemo from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/number-field/FieldDemo';
import SpinnerDemo from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/number-field/SpinnerDemo';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Outlined',
    url: 'https://mui.com/material-ui/react-number-field/#outlined-field',
    example: <FieldDemo />,
  },
  {
    name: 'Spinner',
    url: 'https://mui.com/material-ui/react-number-field/#spinner-field',
    example: <SpinnerDemo />,
  },
];

export function NumberFieldBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

import type React from 'react';
import BasicTimeField from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/time-field/BasicTimeField';
import CustomTimeFormat from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/time-field/CustomTimeFormat';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-date-pickers/time-field/#basic-usage',
    example: <BasicTimeField />,
  },
  {
    name: 'Time format',
    url: 'https://mui.com/x/react-date-pickers/time-field/#customize-the-time-format',
    example: <CustomTimeFormat />,
  },
];

export function TimeFieldBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

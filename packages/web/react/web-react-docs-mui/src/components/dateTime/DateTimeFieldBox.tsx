import type React from 'react';
import BasicDateTimeField from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-time-field/BasicDateTimeField';
import CustomDateTimeFormat from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-time-field/CustomDateTimeFormat';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-date-pickers/date-time-field/#basic-usage',
    example: <BasicDateTimeField />,
  },
  {
    name: 'Date time format',
    url: 'https://mui.com/x/react-date-pickers/date-time-field/#customize-the-date-time-format',
    example: <CustomDateTimeFormat />,
  },
];

export function DateTimeFieldBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

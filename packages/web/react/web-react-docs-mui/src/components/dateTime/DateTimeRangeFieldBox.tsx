import type React from 'react';
import BasicDateTimeRangeField from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-time-range-field/BasicDateTimeRangeField';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-date-pickers/date-time-range-field/#basic-usage',
    example: <BasicDateTimeRangeField />,
  },
];

export function DateTimeRangeFieldBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

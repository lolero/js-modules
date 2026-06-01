import type React from 'react';
import BasicTimeRangeField from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/time-range-field/BasicTimeRangeField';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-date-pickers/time-range-field/#basic-usage',
    example: <BasicTimeRangeField />,
  },
];

export function TimeRangeFieldBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

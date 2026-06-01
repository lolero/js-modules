import type React from 'react';
import BasicDateRangeField from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-range-field/BasicDateRangeField';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-date-pickers/date-range-field/#basic-usage',
    example: <BasicDateRangeField />,
  },
];

export function DateRangeFieldBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

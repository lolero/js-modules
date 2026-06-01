import type React from 'react';
import BasicDateField from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-field/BasicDateField';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-date-pickers/date-field/#basic-usage',
    example: <BasicDateField />,
  },
];

export function DateFieldBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

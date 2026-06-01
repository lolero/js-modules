import type React from 'react';
import BasicTimeRangePicker from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/time-range-picker/BasicTimeRangePicker';
import FormPropsTimeRangePickers from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/time-range-picker/FormPropsTimeRangePickers';
import MultiInputTimeRangePicker from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/time-range-picker/MultiInputTimeRangePicker';
import ResponsiveTimeRangePickers from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/time-range-picker/ResponsiveTimeRangePickers';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-date-pickers/time-range-picker/#basic-usage',
    example: <BasicTimeRangePicker />,
  },
  {
    name: 'Variants',
    url: 'https://mui.com/x/react-date-pickers/time-range-picker/#available-components',
    example: <ResponsiveTimeRangePickers />,
  },
  {
    name: 'Form props',
    url: 'https://mui.com/x/react-date-pickers/time-range-picker/#form-props',
    example: <FormPropsTimeRangePickers />,
  },
  {
    name: 'Multi input',
    url: 'https://mui.com/x/react-date-pickers/time-range-picker/#use-a-multi-input-field',
    example: <MultiInputTimeRangePicker />,
  },
];

export function TimeRangePickerBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

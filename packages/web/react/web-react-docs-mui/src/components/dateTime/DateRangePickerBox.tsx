import type React from 'react';
import BasicDateRangePicker from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-range-picker/BasicDateRangePicker';
import BasicRangeShortcuts from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-range-picker/BasicRangeShortcuts';
import DateRangePickerCalendarProp from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-range-picker/DateRangePickerCalendarProp';
import FormPropsDateRangePickers from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-range-picker/FormPropsDateRangePickers';
import MultiInputDateRangePicker from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-range-picker/MultiInputDateRangePicker';
import ResponsiveDateRangePickers from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-range-picker/ResponsiveDateRangePickers';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-date-pickers/date-range-picker/#basic-usage',
    example: <BasicDateRangePicker />,
  },
  {
    name: 'Variants',
    url: 'https://mui.com/x/react-date-pickers/date-range-picker/#available-components',
    example: <ResponsiveDateRangePickers />,
  },
  {
    name: 'Form props',
    url: 'https://mui.com/x/react-date-pickers/date-range-picker/#form-props',
    example: <FormPropsDateRangePickers />,
  },
  {
    name: 'Multiple calendars',
    url: 'https://mui.com/x/react-date-pickers/date-range-picker/#render-1-to-3-months',
    example: <DateRangePickerCalendarProp />,
  },
  {
    name: 'Multi input',
    url: 'https://mui.com/x/react-date-pickers/date-range-picker/#use-a-multi-input-field',
    example: <MultiInputDateRangePicker />,
  },
  {
    name: 'Shortcuts',
    url: 'https://mui.com/x/react-date-pickers/date-range-picker/#add-shortcuts',
    example: <BasicRangeShortcuts />,
  },
];

export function DateRangePickerBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

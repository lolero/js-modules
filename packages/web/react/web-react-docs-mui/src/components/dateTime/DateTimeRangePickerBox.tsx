import type React from 'react';
import BasicDateTimeRangePicker from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-time-range-picker/BasicDateTimeRangePicker';
import DateTimeRangePickerCalendarProp from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-time-range-picker/DateTimeRangePickerCalendarProp';
import DateTimeRangePickerViewRenderer from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-time-range-picker/DateTimeRangePickerViewRenderer';
import FormPropsDateTimeRangePickers from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-time-range-picker/FormPropsDateTimeRangePickers';
import MultiInputDateTimeRangePicker from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-time-range-picker/MultiInputDateTimeRangePicker';
import ResponsiveDateTimeRangePickers from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-time-range-picker/ResponsiveDateTimeRangePickers';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-date-pickers/date-time-range-picker/#basic-usage',
    example: <BasicDateTimeRangePicker />,
  },
  {
    name: 'Variants',
    url: 'https://mui.com/x/react-date-pickers/date-time-range-picker/#available-components',
    example: <ResponsiveDateTimeRangePickers />,
  },
  {
    name: 'Form props',
    url: 'https://mui.com/x/react-date-pickers/date-time-range-picker/#form-props',
    example: <FormPropsDateTimeRangePickers />,
  },
  {
    name: 'Multiple calendars',
    url: 'https://mui.com/x/react-date-pickers/date-time-range-picker/#render-1-to-3-months',
    example: <DateTimeRangePickerCalendarProp />,
  },
  {
    name: 'Multi input',
    url: 'https://mui.com/x/react-date-pickers/date-time-range-picker/#use-a-multi-input-field',
    example: <MultiInputDateTimeRangePicker />,
  },
  {
    name: 'View renderer',
    url: 'https://mui.com/x/react-date-pickers/date-time-range-picker/#change-view-renderer',
    example: <DateTimeRangePickerViewRenderer />,
  },
];

export function DateTimeRangePickerBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

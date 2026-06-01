import type React from 'react';
import BasicDateRangeCalendar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-range-calendar/BasicDateRangeCalendar';
import DateRangeCalendarCalendarsProp from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-range-calendar/DateRangeCalendarCalendarsProp';
import DateRangeCalendarFormProps from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-range-calendar/DateRangeCalendarFormProps';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-date-pickers/date-range-calendar/#basic-usage',
    example: <BasicDateRangeCalendar />,
  },
  {
    name: 'Form props',
    url: '',
    example: <DateRangeCalendarFormProps />,
  },
  {
    name: 'Multiple calendars',
    url: 'https://mui.com/x/react-date-pickers/date-range-calendar/#choose-the-months-to-render',
    example: <DateRangeCalendarCalendarsProp />,
  },
];

export function DateRangeCalendarBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

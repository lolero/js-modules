import type React from 'react';
import AddWeekNumber from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-calendar/AddWeekNumber';
import BasicDateCalendar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-calendar/BasicDateCalendar';
import CustomMonthLayout from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-calendar/CustomMonthLayout';
import DateCalendarFormProps from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-calendar/DateCalendarFormProps';
import DateCalendarServerRequest from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-calendar/DateCalendarServerRequest';
import DateCalendarViews from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-calendar/DateCalendarViews';
import WeekPicker from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-calendar/WeekPicker';
import YearMonthCalendar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-calendar/YearMonthCalendar';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-date-pickers/date-calendar/#basic-usage',
    example: <BasicDateCalendar />,
  },
  {
    name: 'Form props',
    url: 'https://mui.com/x/react-date-pickers/date-calendar/#form-props',
    example: <DateCalendarFormProps />,
  },
  {
    name: 'Views',
    url: 'https://mui.com/x/react-date-pickers/date-calendar/#views',
    example: <DateCalendarViews />,
  },
  {
    name: 'Month & year',
    url: 'https://mui.com/x/react-date-pickers/date-calendar/#month-and-year-calendar',
    example: <YearMonthCalendar />,
  },
  {
    name: 'Additional days',
    url: 'https://mui.com/x/react-date-pickers/date-calendar/#show-additional-days',
    example: <CustomMonthLayout />,
  },
  {
    name: 'Week numbers',
    url: 'https://mui.com/x/react-date-pickers/date-calendar/#display-week-number',
    example: <AddWeekNumber />,
  },
  {
    name: 'Week picker',
    url: 'https://mui.com/x/react-date-pickers/date-calendar/#week-picker',
    example: <WeekPicker />,
  },
  {
    name: 'Dynamic data',
    url: 'https://mui.com/x/react-date-pickers/date-calendar/#dynamic-data',
    example: <DateCalendarServerRequest />,
  },
];

export function DateCalendarBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

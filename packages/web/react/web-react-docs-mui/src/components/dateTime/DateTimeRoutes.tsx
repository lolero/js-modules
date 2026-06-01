import type React from 'react';
import {
  WebModules,
  WebSubModulesDateTime,
} from '../../constants/modules.constants';
import { DocsMuiModuleRoutes } from '../DocsMuiModuleRoutes';
import { DateCalendarBox } from './DateCalendarBox';
import { DateFieldBox } from './DateFieldBox';
import { DatePickerBox } from './DatePickerBox';
import { DateRangeCalendarBox } from './DateRangeCalendarBox';
import { DateRangeFieldBox } from './DateRangeFieldBox';
import { DateRangePickerBox } from './DateRangePickerBox';
import { DateTimeBox } from './DateTimeBox';
import { DateTimeFieldBox } from './DateTimeFieldBox';
import { DateTimePickerBox } from './DateTimePickerBox';
import { DateTimeRangeFieldBox } from './DateTimeRangeFieldBox';
import { DateTimeRangePickerBox } from './DateTimeRangePickerBox';
import { TimeClockAnalogBox } from './TimeClockAnalogBox';
import { TimeClockDigitalBox } from './TimeClockDigitalBox';
import { TimeFieldBox } from './TimeFieldBox';
import { TimePickerBox } from './TimePickerBox';
import { TimeRangeFieldBox } from './TimeRangeFieldBox';
import { TimeRangePickerBox } from './TimeRangePickerBox';

const subModuleBoxes: Record<WebSubModulesDateTime, React.ReactNode> = {
  [WebSubModulesDateTime.datePicker]: <DatePickerBox />,
  [WebSubModulesDateTime.datePickerRange]: <DateRangePickerBox />,
  [WebSubModulesDateTime.dateField]: <DateFieldBox />,
  [WebSubModulesDateTime.dateFieldRange]: <DateRangeFieldBox />,
  [WebSubModulesDateTime.dateCalendar]: <DateCalendarBox />,
  [WebSubModulesDateTime.dateCalendarRange]: <DateRangeCalendarBox />,
  [WebSubModulesDateTime.timePicker]: <TimePickerBox />,
  [WebSubModulesDateTime.timePickerRange]: <TimeRangePickerBox />,
  [WebSubModulesDateTime.timeField]: <TimeFieldBox />,
  [WebSubModulesDateTime.timeFieldRange]: <TimeRangeFieldBox />,
  [WebSubModulesDateTime.timeClockAnalog]: <TimeClockAnalogBox />,
  [WebSubModulesDateTime.timeClockDigital]: <TimeClockDigitalBox />,
  [WebSubModulesDateTime.dateTimePicker]: <DateTimePickerBox />,
  [WebSubModulesDateTime.dateTimePickerRange]: <DateTimeRangePickerBox />,
  [WebSubModulesDateTime.dateTimeField]: <DateTimeFieldBox />,
  [WebSubModulesDateTime.dateTimeFieldRange]: <DateTimeRangeFieldBox />,
};

export function DateTimeRoutes(): React.ReactNode {
  return (
    <DocsMuiModuleRoutes
      webModule={WebModules.dateTime}
      subModuleBoxes={subModuleBoxes}
      moduleBox={<DateTimeBox />}
    />
  );
}

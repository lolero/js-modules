import type React from 'react';
import BasicTimeClock from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/time-clock/BasicTimeClock';
import TimeClockAmPm from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/time-clock/TimeClockAmPm';
import TimeClockFormProps from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/time-clock/TimeClockFormProps';
import TimeClockViews from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/time-clock/TimeClockViews';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-date-pickers/time-clock/#basic-usage',
    example: <BasicTimeClock />,
  },
  {
    name: 'Form props',
    url: 'https://mui.com/x/react-date-pickers/time-clock/#form-props',
    example: <TimeClockFormProps />,
  },
  {
    name: 'Views',
    url: 'https://mui.com/x/react-date-pickers/time-clock/#views',
    example: <TimeClockViews />,
  },
  {
    name: '12h/24h format',
    url: 'https://mui.com/x/react-date-pickers/time-clock/#12h-24h-format',
    example: <TimeClockAmPm />,
  },
];

export function TimeClockAnalogBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

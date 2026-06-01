import type React from 'react';
import DigitalClockAmPm from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/digital-clock/DigitalClockAmPm';
import DigitalClockBasic from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/digital-clock/DigitalClockBasic';
import DigitalClockFormProps from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/digital-clock/DigitalClockFormProps';
import DigitalClockSkipDisabled from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/digital-clock/DigitalClockSkipDisabled';
import DigitalClockTimeStep from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/digital-clock/DigitalClockTimeStep';
import DigitalClockViews from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/digital-clock/DigitalClockViews';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-date-pickers/digital-clock/#basic-usage',
    example: <DigitalClockBasic />,
  },
  {
    name: 'Form props',
    url: 'https://mui.com/x/react-date-pickers/digital-clock/#form-props',
    example: <DigitalClockFormProps />,
  },
  {
    name: 'Views',
    url: 'https://mui.com/x/react-date-pickers/digital-clock/#views',
    example: <DigitalClockViews />,
  },
  {
    name: '12h/24h format',
    url: 'https://mui.com/x/react-date-pickers/digital-clock/#12h-24h-format',
    example: <DigitalClockAmPm />,
  },
  {
    name: 'Time steps',
    url: 'https://mui.com/x/react-date-pickers/digital-clock/#time-steps',
    example: <DigitalClockTimeStep />,
  },
  {
    name: 'Skip disabled options',
    url: 'https://mui.com/x/react-date-pickers/digital-clock/#skip-rendering-disabled-options',
    example: <DigitalClockSkipDisabled />,
  },
];

export function TimeClockDigitalBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

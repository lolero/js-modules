import type React from 'react';
import TimelineDemo from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/components/overview/scheduler/mainDemo/TimelineDemo';
import RecurringEventsDataset from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/scheduler/recurring-events/RecurringEventsDataset';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Calendar',
    url: 'https://mui.com/x/react-scheduler/recurring-events/',
    example: <RecurringEventsDataset />,
  },
  {
    name: 'Timeline',
    url: 'https://mui.com/x/react-scheduler/#event-timeline',
    example: <TimelineDemo />,
  },
];

export function SchedulerBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

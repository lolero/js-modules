// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import * as React from 'react';
import { SchedulerEvent } from '@mui/x-scheduler/models';
import { EventCalendarPremium } from '@mui/x-scheduler-premium/event-calendar-premium';
import {
  initialEvents,
  defaultVisibleDate,
  resources,
} from '../datasets/recurring-event-durations';

export default function RecurringEventDurations() {
  const [events, setEvents] = React.useState<SchedulerEvent[]>(initialEvents);

  return (
    <div style={{ height: '700px', width: '100%' }}>
      <EventCalendarPremium
        events={events}
        resources={resources}
        defaultVisibleDate={defaultVisibleDate}
        onEventsChange={setEvents}
        defaultPreferences={{ isSidePanelOpen: false }}
      />
    </div>
  );
}

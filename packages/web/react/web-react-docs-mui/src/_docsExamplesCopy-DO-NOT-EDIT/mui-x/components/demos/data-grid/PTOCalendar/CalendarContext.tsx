// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import * as React from 'react';
import { useCalendarState } from './hooks/useCalendarState';

export const CalendarContext = React.createContext<ReturnType<typeof useCalendarState> | undefined>(
  undefined,
);

export function useCalendarContext() {
  const context = React.useContext(CalendarContext);

  if (context === undefined) {
    throw new Error('Missing context');
  }

  return context;
}

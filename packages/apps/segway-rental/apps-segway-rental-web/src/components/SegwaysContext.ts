import React from 'react';
import { noop } from 'lodash';
import { DateRange } from '@mui/lab/DateRangePicker';

const SegwaysContext = React.createContext<{
  filterDates: {
    value: [string | null, string | null];
    changeCallback: (dates: DateRange<string>) => void;
  };
  filterModel: {
    value: string | null;
    changeCallback: (
      e: React.SyntheticEvent<Element, Event>,
      selectedModel: string | null,
    ) => void;
  };
  filterColor: {
    value: string | null;
    changeCallback: (
      e: React.SyntheticEvent<Element, Event>,
      selectedColor: string | null,
    ) => void;
  };
  filterLocation: {
    value: string | null;
    changeCallback: (
      e: React.SyntheticEvent<Element, Event>,
      selectedLocation: string | null,
    ) => void;
  };
}>({
  filterDates: {
    value: [null, null],
    changeCallback: noop,
  },
  filterModel: {
    value: null,
    changeCallback: noop,
  },
  filterColor: {
    value: null,
    changeCallback: noop,
  },
  filterLocation: {
    value: null,
    changeCallback: noop,
  },
});

export default SegwaysContext;

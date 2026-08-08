import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, parse } from 'date-fns';
import type React from 'react';
import { useSearchParamLogDate } from '@js-modules/apps-travel-log-common-utils';
import { useWebRouter } from '@js-modules/web-react-router';

export function LogDatePicker(): React.ReactNode {
  const { setSearchParams } = useWebRouter();

  const logDate = useSearchParamLogDate();

  function changeLogDateCallback(value: Date | null): void {
    setSearchParams((searchParamsPrevious) => {
      if (value) {
        searchParamsPrevious.set('log-date', format(value, 'yyyy-MM-dd'));
      } else {
        searchParamsPrevious.delete('log-date');
      }
      return searchParamsPrevious;
    });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        sx={{
          mt: 2,
        }}
        label="Log Date"
        format="dd-MM-yyyy"
        value={parse(logDate, 'yyyy-MM-dd', new Date())}
        onChange={changeLogDateCallback}
        slotProps={{
          field: { clearable: true },
          textField: { size: 'small' },
        }}
      />
    </LocalizationProvider>
  );
}

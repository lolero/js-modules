import React, { useCallback } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, parse } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { useSearchParamLogDate } from '@js-modules/apps-travel-log-common-utils';

export const LogDatePicker: React.FC = () => {
  const [, setSearchParams] = useSearchParams();

  const logDate = useSearchParamLogDate();

  const changeLogDateCallback = useCallback(
    (value: Date | null) => {
      setSearchParams((searchParamsPrevious) => {
        if (value) {
          searchParamsPrevious.set('log-date', format(value, 'yyyy-MM-dd'));
        } else {
          searchParamsPrevious.delete('log-date');
        }
        return searchParamsPrevious;
      });
    },
    [setSearchParams],
  );

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
};

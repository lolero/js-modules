import Box from '@mui/material/Box';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { PickerValidDate } from '@mui/x-date-pickers/models';
import { format, parse } from 'date-fns';
import isNull from 'lodash/isNull';
import type React from 'react';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFindManyRangesUtils } from '@js-modules/common-react-utils';

export type FindManyRangeBoxDateProps = {
  rangeKey: string;
};

export const FindManyRangeBoxDate: React.FC<FindManyRangeBoxDateProps> = ({
  rangeKey,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getRangeCallback, setRangeCallback } = useFindManyRangesUtils(
    searchParams,
    setSearchParams,
  );

  const range = useMemo(() => {
    const rangeTemp = getRangeCallback(rangeKey);
    return rangeTemp;
  }, [getRangeCallback, rangeKey]);

  // The picker uses `AdapterDateFns`, so values are always `Date` at runtime.
  // Typing the param as the picker's own `PickerValidDate` (and narrowing with
  // `instanceof Date`) keeps `onChange` assignable even when another package's
  // typecheck pulls in adapters that widen the global `PickerValidDate` union.
  const changeDateRangeFromCallback = useCallback(
    (value: PickerValidDate | null) => {
      setRangeCallback(rangeKey, [
        value instanceof Date ? format(value, 'yyyyMMdd') : 'null',
        range[1],
      ]);
    },
    [range, rangeKey, setRangeCallback],
  );

  const changeDateRangeToCallback = useCallback(
    (value: PickerValidDate | null) => {
      setRangeCallback(rangeKey, [
        range[0],
        value instanceof Date ? format(value, 'yyyyMMdd') : 'null',
      ]);
    },
    [range, rangeKey, setRangeCallback],
  );

  // return (
  //   <MenuItem>
  //     <LocalizationProvider dateAdapter={AdapterDateFns}>
  //       <DateRangePicker
  //         localeText={{ start: 'From', end: 'To' }}
  //         onChange={changeDateRangeCallback}
  //       />
  //     </LocalizationProvider>
  //   </MenuItem>
  // );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={
            isNull(range[0])
              ? null
              : parse(range[0] as string, 'yyyyMMdd', new Date())
          }
          onChange={changeDateRangeFromCallback}
          slotProps={{
            field: { clearable: true },
          }}
        />
      </LocalizationProvider>
      -
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={
            isNull(range[1])
              ? null
              : parse(range[1] as string, 'yyyyMMdd', new Date())
          }
          onChange={changeDateRangeToCallback}
          slotProps={{
            field: { clearable: true },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

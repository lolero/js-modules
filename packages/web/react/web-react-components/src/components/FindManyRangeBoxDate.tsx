import React, { useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import isNull from 'lodash/isNull';
import { format, parse } from 'date-fns';
import { useFindManyRangesUtils } from '@js-modules/common-react-hooks';

export type FindManyRangeBoxDateProps = {
  rangeKey: string;
};

export const FindManyRangeBoxDate: React.FC<FindManyRangeBoxDateProps> = ({
  rangeKey,
}) => {
  const { getRangeCallback, setRangeCallback } = useFindManyRangesUtils();

  const range = useMemo(() => {
    const rangeTemp = getRangeCallback(rangeKey);
    return rangeTemp;
  }, [getRangeCallback, rangeKey]);

  const changeDateRangeFromCallback = useCallback(
    (value: Date | null) => {
      setRangeCallback(rangeKey, [
        value ? format(value, 'yyyyMMdd') : 'null',
        range[1],
      ]);
    },
    [range, rangeKey, setRangeCallback],
  );

  const changeDateRangeToCallback = useCallback(
    (value: Date | null) => {
      setRangeCallback(rangeKey, [
        range[0],
        value ? format(value, 'yyyyMMdd') : 'null',
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

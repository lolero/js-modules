// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { MultiInputDateRangeField } from '@mui/x-date-pickers-pro/MultiInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export default function MultiInputDateRangePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['MultiInputDateRangeField']}>
        <DateRangePicker slots={{ field: MultiInputDateRangeField }} />
      </DemoContainer>
    </LocalizationProvider>
  );
}

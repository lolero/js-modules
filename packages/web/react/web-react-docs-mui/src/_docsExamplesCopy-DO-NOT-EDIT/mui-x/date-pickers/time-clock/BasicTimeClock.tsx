// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';

export default function BasicTimeClock() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimeClock />
    </LocalizationProvider>
  );
}

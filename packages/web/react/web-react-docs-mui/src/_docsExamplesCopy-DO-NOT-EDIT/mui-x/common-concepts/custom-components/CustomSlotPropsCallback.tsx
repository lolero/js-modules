// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function CustomSlotPropsCallback() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        slotProps={{
          openPickerIcon: (ownerState) => ({
            color: ownerState.isPickerOpen ? 'secondary' : 'primary',
          }),
        }}
      />
    </LocalizationProvider>
  );
}

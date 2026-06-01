// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker';

export default function FormPropsDateTimeRangePickers() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DateTimeRangePicker',
          'DateTimeRangePicker',
          'DateTimeRangePicker',
        ]}
      >
        <DateTimeRangePicker label="disabled" disabled />
        <DateTimeRangePicker label="readOnly" readOnly />
        <DateTimeRangePicker label="name" name="startDateTimeRange" />
      </DemoContainer>
    </LocalizationProvider>
  );
}

// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

export default function BasicDateField() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateField']}>
        <DateField label="Basic date field" />
      </DemoContainer>
    </LocalizationProvider>
  );
}

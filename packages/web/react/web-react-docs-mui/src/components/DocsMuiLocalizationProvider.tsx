import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type React from 'react';
import { DocsMuiNavContextProvider } from './DocsMuiNavContextProvider';

export function DocsMuiLocalizationProvider(): React.ReactNode {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DocsMuiNavContextProvider />
    </LocalizationProvider>
  );
}

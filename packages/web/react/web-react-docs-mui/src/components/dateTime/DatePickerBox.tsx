import Box from '@mui/material/Box';
import type React from 'react';
import BasicDatePicker from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-picker/BasicDatePicker';
import ClearableProp from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-picker/ClearableProp';
import DatePickerOpenTo from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-picker/DatePickerOpenTo';
import DatePickerViews from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-picker/DatePickerViews';
import FormPropsDatePickers from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-picker/FormPropsDatePickers';
import HelperText from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-picker/HelperText';
import ResponsiveDatePickers from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-picker/ResponsiveDatePickers';
import StaticDatePickerLandscape from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-picker/StaticDatePickerLandscape';
import BasicShortcuts from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/shortcuts/BasicShortcuts';
import DisabledDatesShortcuts from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/shortcuts/DisabledDatesShortcuts';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-date-pickers/date-picker/#basic-usage',
    example: <BasicDatePicker />,
  },
  {
    name: 'Variants',
    url: 'https://mui.com/x/react-date-pickers/date-picker/#available-components',
    example: <ResponsiveDatePickers />,
  },
  {
    name: 'Form props',
    url: 'https://mui.com/x/react-date-pickers/date-picker/#form-props',
    example: <FormPropsDatePickers />,
  },
  {
    name: 'Views',
    url: 'https://mui.com/x/react-date-pickers/date-picker/#views',
    example: (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <DatePickerViews />
        <DatePickerOpenTo />
      </Box>
    ),
  },
  {
    name: 'Landscape',
    url: 'https://mui.com/x/react-date-pickers/date-picker/#landscape-orientation',
    example: <StaticDatePickerLandscape />,
  },
  {
    name: 'Helper text',
    url: 'https://mui.com/x/react-date-pickers/date-picker/#helper-text',
    example: <HelperText />,
  },
  {
    name: 'Clearable',
    url: 'https://mui.com/x/react-date-pickers/date-picker/#clearing-the-value',
    example: <ClearableProp />,
  },
  {
    name: 'Shortcuts',
    url: 'https://mui.com/x/react-date-pickers/shortcuts/#adding-shortcuts',
    example: <BasicShortcuts />,
  },
  {
    name: 'Shortcuts disabled',
    url: 'https://mui.com/x/react-date-pickers/shortcuts/#disabled-dates',
    example: <DisabledDatesShortcuts />,
  },
];

export function DatePickerBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

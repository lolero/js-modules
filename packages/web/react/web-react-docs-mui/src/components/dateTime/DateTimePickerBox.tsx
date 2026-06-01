import Box from '@mui/material/Box';
import type React from 'react';
import BasicDateTimePicker from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-time-picker/BasicDateTimePicker';
import DateTimePickerOpenTo from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-time-picker/DateTimePickerOpenTo';
import DateTimePickerViewRenderers from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-time-picker/DateTimePickerViewRenderers';
import DateTimePickerViews from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-time-picker/DateTimePickerViews';
import FormPropsDateTimePickers from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-time-picker/FormPropsDateTimePickers';
import ResponsiveDateTimePickers from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-time-picker/ResponsiveDateTimePickers';
import StaticDateTimePickerLandscape from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/date-time-picker/StaticDateTimePickerLandscape';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-date-pickers/date-time-picker/#basic-usage',
    example: <BasicDateTimePicker />,
  },
  {
    name: 'Variant',
    url: 'https://mui.com/x/react-date-pickers/date-time-picker/#available-components',
    example: <ResponsiveDateTimePickers />,
  },
  {
    name: 'Form props',
    url: 'https://mui.com/x/react-date-pickers/date-time-picker/#form-props',
    example: <FormPropsDateTimePickers />,
  },
  {
    name: 'Views',
    url: 'https://mui.com/x/react-date-pickers/date-time-picker/#views',
    example: (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <DateTimePickerViews />
        <DateTimePickerOpenTo />
      </Box>
    ),
  },
  {
    name: 'Landscape',
    url: 'https://mui.com/x/react-date-pickers/date-time-picker/#landscape-orientation',
    example: <StaticDateTimePickerLandscape />,
  },
  {
    name: 'View renderer',
    url: 'https://mui.com/x/react-date-pickers/date-time-picker/#choose-time-view-renderer',
    example: <DateTimePickerViewRenderers />,
  },
];

export function DateTimePickerBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

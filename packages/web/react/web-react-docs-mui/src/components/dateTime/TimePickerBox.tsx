import Box from '@mui/material/Box';
import type React from 'react';
import BasicTimePicker from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers//time-picker/BasicTimePicker';
import FormPropsTimePickers from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers//time-picker/FormPropsTimePickers';
import ResponsiveTimePickers from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers//time-picker/ResponsiveTimePickers';
import StaticTimePickerLandscape from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers//time-picker/StaticTimePickerLandscape';
import TimePickerOpenTo from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers//time-picker/TimePickerOpenTo';
import TimePickerViewRenderers from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers//time-picker/TimePickerViewRenderers';
import TimePickerViews from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers//time-picker/TimePickerViews';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-date-pickers/time-picker/#basic-usage',
    example: <BasicTimePicker />,
  },
  {
    name: 'Variants',
    url: 'https://mui.com/x/react-date-pickers/time-picker/#available-components',
    example: <ResponsiveTimePickers />,
  },
  {
    name: 'Form props',
    url: 'https://mui.com/x/react-date-pickers/time-picker/#form-props',
    example: <FormPropsTimePickers />,
  },
  {
    name: 'Views',
    url: 'https://mui.com/x/react-date-pickers/time-picker/#views',
    example: (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <TimePickerViews />
        <TimePickerOpenTo />
      </Box>
    ),
  },
  {
    name: 'Landscape',
    url: 'https://mui.com/x/react-date-pickers/time-picker/#landscape-orientation',
    example: <StaticTimePickerLandscape />,
  },
  {
    name: 'View renderer',
    url: 'https://mui.com/x/react-date-pickers/time-picker/#choose-time-view-renderer',
    example: <TimePickerViewRenderers />,
  },
];

export function TimePickerBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

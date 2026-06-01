import Box from '@mui/material/Box';
import type React from 'react';
import Internationalization from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/components/overview/pickers/Internationalization';
import MainDemo from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/components/overview/pickers/MainDemo';
import PickersPlayground from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/components/PickersPlayground';
import AmPMCustomization from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/adapters-locale/AmPMCustomization';
import LocalizationDateFns from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/adapters-locale/LocalizationDateFns';
import ComponentExplorerNoSnap from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/base-concepts/ComponentExplorerNoSnap';
import ComponentFamilies from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/base-concepts/ComponentFamilies';
import ResponsivePickers from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/base-concepts/ResponsivePickers';
import AdapterJalali from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/calendar-systems/AdapterJalali';
import AddWarningIconWhenInvalid from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/custom-opening-button/AddWarningIconWhenInvalid';
import AddWarningIconWhenInvalidRange from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/custom-opening-button/AddWarningIconWhenInvalidRange';
import CustomOpeningIcon from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/custom-opening-button/CustomOpeningIcon';
import StartEdgeOpeningButton from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/custom-opening-button/StartEdgeOpeningButton';
import DateRangeFieldExamples from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/fields/DateRangeFieldExamples';
import SingleDateFieldExamples from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/fields/SingleDateFieldExamples';
import TimezonePlayground from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/timezone/TimezonePlayground';
import RenderErrorUnderField from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/date-pickers/validation/RenderErrorUnderField';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Demo',
    url: 'https://mui.com/x/react-date-pickers/',
    example: <MainDemo />,
  },
  {
    name: 'Playground',
    url: 'https://mui.com/x/react-date-pickers/playground/',
    example: <PickersPlayground />,
  },
  {
    name: 'Date and/or time editing',
    url: 'https://mui.com/x/react-date-pickers/base-concepts/#date-or-time-editing',
    example: <ComponentFamilies />,
  },
  {
    name: 'Single field components',
    url: 'https://mui.com/x/react-date-pickers/fields/#fields-to-edit-a-single-element',
    example: <SingleDateFieldExamples />,
  },
  {
    name: 'Range fields components',
    url: 'https://mui.com/x/react-date-pickers/fields/#fields-to-edit-a-range',
    example: <DateRangeFieldExamples />,
  },
  {
    name: 'Responsive',
    url: 'https://mui.com/x/react-date-pickers/base-concepts/#responsiveness',
    example: <ResponsivePickers />,
  },
  {
    name: 'Find your component',
    url: 'https://mui.com/x/react-date-pickers/base-concepts/#find-your-component',
    example: <ComponentExplorerNoSnap />,
  },
  {
    name: 'Internationalization',
    url: 'https://mui.com/x/react-date-pickers/',
    example: <Internationalization />,
  },
  {
    name: 'Localization',
    url: 'https://mui.com/x/react-date-pickers/adapters-locale/#with-date-fns',
    example: <LocalizationDateFns />,
  },
  {
    name: '12h/24h Format',
    url: 'https://mui.com/x/react-date-pickers/adapters-locale/#meridiem-12h-24h-format',
    example: <AmPMCustomization />,
  },
  {
    name: 'Timezone',
    url: 'https://mui.com/x/react-date-pickers/timezone/#supported-timezones',
    example: <TimezonePlayground />,
  },
  {
    name: 'Calendar systems',
    url: 'https://mui.com/x/react-date-pickers/calendar-systems/#jalali',
    example: <AdapterJalali />,
  },
  {
    name: 'Validation',
    url: 'https://mui.com/x/react-date-pickers/validation/#show-the-error',
    example: <RenderErrorUnderField />,
  },
  {
    name: 'Custom icons',
    url: 'https://mui.com/x/react-date-pickers/custom-opening-button/',
    example: (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <CustomOpeningIcon />
        <StartEdgeOpeningButton />
        <AddWarningIconWhenInvalid />
        <AddWarningIconWhenInvalidRange />
      </Box>
    ),
  },
];

export function DateTimeBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

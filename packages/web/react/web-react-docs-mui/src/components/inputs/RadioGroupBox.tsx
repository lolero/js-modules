import type React from 'react';
import ColorRadioButtons from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/radio-buttons/ColorRadioButtons';
import ErrorRadios from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/radio-buttons/ErrorRadios';
import FormControlLabelPlacement from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/radio-buttons/FormControlLabelPlacement';
import RadioButtons from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/radio-buttons/RadioButtons';
import RowRadioButtonsGroup from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/radio-buttons/RowRadioButtonsGroup';
import SizeRadioButtons from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/radio-buttons/SizeRadioButtons';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-radio-button/#radio-group',
    example: <RadioButtons />,
  },
  {
    name: 'Direction',
    url: 'https://mui.com/material-ui/react-radio-button/#direction',
    example: <RowRadioButtonsGroup />,
  },
  {
    name: 'Size',
    url: 'https://mui.com/material-ui/react-radio-button/#size',
    example: <SizeRadioButtons />,
  },
  {
    name: 'Color',
    url: 'https://mui.com/material-ui/react-radio-button/#color',
    example: <ColorRadioButtons />,
  },
  {
    name: 'Label placement',
    url: 'https://mui.com/material-ui/react-radio-button/#label-placement',
    example: <FormControlLabelPlacement />,
  },
  {
    name: 'Error',
    url: 'https://mui.com/material-ui/react-radio-button/#show-error',
    example: <ErrorRadios />,
  },
];

export function RadioGroupBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

import type React from 'react';
import Checkboxes from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/checkboxes/Checkboxes';
import CheckboxLabels from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/checkboxes/CheckboxLabels';
import ColorCheckboxes from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/checkboxes/ColorCheckboxes';
import FormControlLabelPosition from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/checkboxes/FormControlLabelPosition';
import IconCheckboxes from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/checkboxes/IconCheckboxes';
import IndeterminateCheckbox from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/checkboxes/IndeterminateCheckbox';
import SizeCheckboxes from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/checkboxes/SizeCheckboxes';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-checkbox/#basic-checkboxes',
    example: <Checkboxes />,
  },
  {
    name: 'Label',
    url: 'https://mui.com/material-ui/react-checkbox/#label',
    example: <CheckboxLabels />,
  },
  {
    name: 'Size',
    url: 'https://mui.com/material-ui/react-checkbox/#size',
    example: <SizeCheckboxes />,
  },
  {
    name: 'Color',
    url: 'https://mui.com/material-ui/react-checkbox/#color',
    example: <ColorCheckboxes />,
  },
  {
    name: 'Icon',
    url: 'https://mui.com/material-ui/react-checkbox/#icon',
    example: <IconCheckboxes />,
  },
  {
    name: 'Indeterminate',
    url: 'https://mui.com/material-ui/react-checkbox/#indeterminate',
    example: <IndeterminateCheckbox />,
  },
  {
    name: 'Label placement',
    url: 'https://mui.com/material-ui/react-checkbox/#label-placement',
    example: <FormControlLabelPosition />,
  },
];

export function CheckboxBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

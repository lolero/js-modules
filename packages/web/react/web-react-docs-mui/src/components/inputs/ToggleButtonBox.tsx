import type React from 'react';
import ColorToggleButton from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/toggle-button/ColorToggleButton';
import StandaloneToggleButton from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/toggle-button/StandaloneToggleButton';
import ToggleButtons from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/toggle-button/ToggleButtons';
import ToggleButtonSizes from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/toggle-button/ToggleButtonSizes';
import ToggleButtonsMultiple from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/toggle-button/ToggleButtonsMultiple';
import VerticalToggleButtons from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/toggle-button/VerticalToggleButtons';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Exclusive selection',
    url: 'https://mui.com/material-ui/react-toggle-button/#exclusive-selection',
    example: <ToggleButtons />,
  },
  {
    name: 'Multiple selection',
    url: 'https://mui.com/material-ui/react-toggle-button/#multiple-selection',
    example: <ToggleButtonsMultiple />,
  },
  {
    name: 'Size',
    url: 'https://mui.com/material-ui/react-toggle-button/#size',
    example: <ToggleButtonSizes />,
  },
  {
    name: 'Color',
    url: 'https://mui.com/material-ui/react-toggle-button/#color',
    example: <ColorToggleButton />,
  },
  {
    name: 'Vertical',
    url: 'https://mui.com/material-ui/react-toggle-button/#vertical-buttons',
    example: <VerticalToggleButtons />,
  },
  {
    name: 'Standalone',
    url: 'https://mui.com/material-ui/react-toggle-button/#standalone-toggle-button',
    example: <StandaloneToggleButton />,
  },
];

export function ToggleButtonBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

import type React from 'react';
import BasicButtonGroup from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/button-group/BasicButtonGroup';
import GroupOrientation from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/button-group/GroupOrientation';
import GroupSizesColors from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/button-group/GroupSizesColors';
import LoadingButtonGroup from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/button-group/LoadingButtonGroup';
import SplitButton from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/button-group/SplitButton';
import VariantButtonGroup from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/button-group/VariantButtonGroup';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-button-group/#basic-button-group',
    example: <BasicButtonGroup />,
  },
  {
    name: 'Variants',
    url: 'https://mui.com/material-ui/react-button-group/#button-variants',
    example: <VariantButtonGroup />,
  },
  {
    name: 'Sizes and colors',
    url: 'https://mui.com/material-ui/react-button-group/#sizes-and-colors',
    example: <GroupSizesColors />,
  },
  {
    name: 'Vertical',
    url: 'https://mui.com/material-ui/react-button-group/#vertical-group',
    example: <GroupOrientation />,
  },
  {
    name: 'Split button',
    url: 'https://mui.com/material-ui/react-button-group/#split-button',
    example: <SplitButton />,
  },
  {
    name: 'Loading',
    url: 'https://mui.com/material-ui/react-button-group/#loading',
    example: <LoadingButtonGroup />,
  },
];

export function ButtonGroupBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

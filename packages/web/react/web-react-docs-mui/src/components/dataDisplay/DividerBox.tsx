import type React from 'react';
import DividerText from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/dividers/DividerText';
import DividerVariants from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/dividers/DividerVariants';
import VerticalDividerMiddle from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/dividers/VerticalDividerMiddle';
import VerticalDividers from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/dividers/VerticalDividers';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Variants',
    url: 'https://mui.com/material-ui/react-divider/#variants',
    example: <DividerVariants />,
  },
  {
    name: 'Vertical',
    url: 'https://mui.com/material-ui/react-divider/#orientation',
    example: <VerticalDividers />,
  },
  {
    name: 'Vertical middle',
    url: 'https://mui.com/material-ui/react-divider/#icon-grouping',
    example: <VerticalDividerMiddle />,
  },
  {
    name: 'With children',
    url: 'https://mui.com/material-ui/react-divider/#with-children',
    example: <DividerText />,
  },
];

export function DividerBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

import type React from 'react';
import SvgIconChildren from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/icons/SvgIconChildren';
import SvgIconsColor from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/icons/SvgIconsColor';
import SvgIconsSize from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/icons/SvgIconsSize';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/icons/#svgicon',
    example: <SvgIconChildren />,
  },
  {
    name: 'Size',
    url: 'https://mui.com/material-ui/icons/#size',
    example: <SvgIconsSize />,
  },
  {
    name: 'Color',
    url: 'https://mui.com/material-ui/icons/#color',
    example: <SvgIconsColor />,
  },
];

export function IconBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

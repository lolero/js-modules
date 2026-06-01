import type React from 'react';
import PaletteValues from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/palette/PaletteValues';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Colors',
    url: 'https://mui.com/material-ui/customization/palette/#values',
    example: <PaletteValues />,
  },
];

export function PaletteBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

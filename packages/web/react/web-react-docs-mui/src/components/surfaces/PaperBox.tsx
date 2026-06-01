import type React from 'react';
import Elevation from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/paper/Elevation';
import SimplePaper from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/paper/SimplePaper';
import SquareCorners from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/paper/SquareCorners';
import Variants from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/paper/Variants';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-paper/#introduction',
    example: <SimplePaper />,
  },
  {
    name: 'Elevation',
    url: 'https://mui.com/material-ui/react-paper/#elevation',
    example: <Elevation />,
  },
  {
    name: 'Variants',
    url: 'https://mui.com/material-ui/react-paper/#variants',
    example: <Variants />,
  },
  {
    name: 'Corners',
    url: 'https://mui.com/material-ui/react-paper/#corners',
    example: <SquareCorners />,
  },
];

export function PaperBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

import type React from 'react';
import Animations from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/skeleton/Animations';
import Facebook from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/skeleton/Facebook';
import Variants from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/skeleton/Variants';
import YouTube from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/skeleton/YouTube';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Variants',
    url: 'https://mui.com/material-ui/react-skeleton/#variants',
    example: <Variants />,
  },
  {
    name: 'Animations',
    url: 'https://mui.com/material-ui/react-skeleton/#animations',
    example: <Animations />,
  },
  {
    name: 'Animation pulsate',
    url: 'https://mui.com/material-ui/react-skeleton/#pulsate-example',
    example: <YouTube />,
  },
  {
    name: 'Animation wave',
    url: 'https://mui.com/material-ui/react-skeleton/#wave-example',
    example: <Facebook />,
  },
];

export function SkeletonBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

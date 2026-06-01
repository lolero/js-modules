import type React from 'react';
import BadgeAlignment from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/badges/BadgeAlignment';
import BadgeOverlap from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/badges/BadgeOverlap';
import BadgeVisibility from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/badges/BadgeVisibility';
import ColorBadge from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/badges/ColorBadge';
import DotBadge from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/badges/DotBadge';
import SimpleBadge from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/badges/SimpleBadge';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-badge/#basic-badge',
    example: <SimpleBadge />,
  },
  {
    name: 'Color',
    url: 'https://mui.com/material-ui/react-badge/#color',
    example: <ColorBadge />,
  },
  {
    name: 'Visibility',
    url: 'https://mui.com/material-ui/react-badge/#badge-visibility',
    example: <BadgeVisibility />,
  },
  {
    name: 'Dot',
    url: 'https://mui.com/material-ui/react-badge/#dot-badge',
    example: <DotBadge />,
  },
  {
    name: 'Overlap',
    url: 'https://mui.com/material-ui/react-badge/#badge-overlap',
    example: <BadgeOverlap />,
  },
  {
    name: 'Alignment',
    url: 'https://mui.com/material-ui/react-badge/#badge-alignment',
    example: <BadgeAlignment />,
  },
];

export function BadgeBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

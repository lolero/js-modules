import type React from 'react';
import AutoGrid from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/grid/AutoGrid';
import BasicGrid from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/grid/BasicGrid';
import FullWidthGrid from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/grid/FullWidthGrid';
import InteractiveGrid from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/grid/InteractiveGrid';
import OffsetGrid from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/grid/OffsetGrid';
import ResponsiveGrid from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/grid/ResponsiveGrid';
import RowAndColumnSpacing from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/grid/RowAndColumnSpacing';
import SpacingGrid from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/grid/SpacingGrid';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Playground',
    url: 'https://mui.com/material-ui/react-grid/#interactive',
    example: <InteractiveGrid />,
  },
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-grid/#basic-grid',
    example: <BasicGrid />,
  },
  {
    name: 'Multiple breakpoints',
    url: 'https://mui.com/material-ui/react-grid/#multiple-breakpoints',
    example: <FullWidthGrid />,
  },
  {
    name: 'Spacing',
    url: 'https://mui.com/material-ui/react-grid/#spacing',
    example: <SpacingGrid />,
  },
  {
    name: 'Row & column spacing',
    url: 'https://mui.com/material-ui/react-grid/#row-and-column-spacing',
    example: <RowAndColumnSpacing />,
  },
  {
    name: 'Responsive values',
    url: 'https://mui.com/material-ui/react-grid/#responsive-values',
    example: <ResponsiveGrid />,
  },
  {
    name: 'Auto layout',
    url: 'https://mui.com/material-ui/react-grid/#auto-layout',
    example: <AutoGrid />,
  },
  {
    name: 'Offset',
    url: 'https://mui.com/material-ui/react-grid/#offset',
    example: <OffsetGrid />,
  },
];

export function GridBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

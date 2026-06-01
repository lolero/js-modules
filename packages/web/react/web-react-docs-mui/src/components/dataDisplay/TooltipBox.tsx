import type React from 'react';
import ArrowTooltips from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/tooltips/ArrowTooltips';
import BasicTooltip from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/tooltips/BasicTooltip';
import PositionedTooltips from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/tooltips/PositionedTooltips';
import TriggersTooltips from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/tooltips/TriggersTooltips';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-tooltip/#basic-tooltip',
    example: <BasicTooltip />,
  },
  {
    name: 'Position',
    url: 'https://mui.com/material-ui/react-tooltip/#positioned-tooltips',
    example: <PositionedTooltips />,
  },
  {
    name: 'Arrow',
    url: 'https://mui.com/material-ui/react-tooltip/#arrow-tooltips',
    example: <ArrowTooltips />,
  },
  {
    name: 'Triggers',
    url: 'https://mui.com/material-ui/react-tooltip/#triggers',
    example: <TriggersTooltips />,
  },
];

export function TooltipBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

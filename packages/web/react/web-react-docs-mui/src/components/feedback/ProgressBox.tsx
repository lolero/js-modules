import type React from 'react';
import CircularColor from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/progress/CircularColor';
import CircularCustomScale from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/progress/CircularCustomScale';
import CircularDeterminate from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/progress/CircularDeterminate';
import CircularEnableTrack from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/progress/CircularEnableTrack';
import CircularIndeterminate from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/progress/CircularIndeterminate';
import CircularIntegration from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/progress/CircularIntegration';
import CircularSize from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/progress/CircularSize';
import CircularWithValueLabel from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/progress/CircularWithValueLabel';
import LinearBuffer from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/progress/LinearBuffer';
import LinearColor from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/progress/LinearColor';
import LinearDeterminate from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/progress/LinearDeterminate';
import LinearIndeterminate from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/progress/LinearIndeterminate';
import LinearQuery from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/progress/LinearQuery';
import LinearWithValueLabel from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/progress/LinearWithValueLabel';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Circular',
    url: 'https://mui.com/material-ui/react-progress/#circular',
    example: <CircularIndeterminate />,
  },
  {
    name: 'Circular color',
    url: 'https://mui.com/material-ui/react-progress/#circular-color',
    example: <CircularColor />,
  },
  {
    name: 'Circular size',
    url: 'https://mui.com/material-ui/react-progress/#circular-size',
    example: <CircularSize />,
  },
  {
    name: 'Circular determinate',
    url: 'https://mui.com/material-ui/react-progress/#circular-determinate',
    example: <CircularDeterminate />,
  },
  {
    name: 'Circular custom scale',
    url: 'https://mui.com/material-ui/react-progress/#circular-custom-scale',
    example: <CircularCustomScale />,
  },
  {
    name: 'Circular track',
    url: 'https://mui.com/material-ui/react-progress/#circular-track',
    example: <CircularEnableTrack />,
  },
  {
    name: 'Circular with label',
    url: 'https://mui.com/material-ui/react-progress/#circular-with-label',
    example: <CircularWithValueLabel />,
  },
  {
    name: 'Linear',
    url: 'https://mui.com/material-ui/react-progress/#linear',
    example: <LinearIndeterminate />,
  },
  {
    name: 'Linear reverse',
    url: 'https://mui.com/material-ui/react-progress/#linear-query',
    example: <LinearQuery />,
  },
  {
    name: 'Linear color',
    url: 'https://mui.com/material-ui/react-progress/#linear-color',
    example: <LinearColor />,
  },
  {
    name: 'Linear determinate',
    url: 'https://mui.com/material-ui/react-progress/#linear-determinate',
    example: <LinearDeterminate />,
  },
  {
    name: 'Linear buffer',
    url: 'https://mui.com/material-ui/react-progress/#linear-buffer',
    example: <LinearBuffer />,
  },
  {
    name: 'Linear with label',
    url: 'https://mui.com/material-ui/react-progress/#linear-with-label',
    example: <LinearWithValueLabel />,
  },
  {
    name: 'Interactive integrations',
    url: 'https://mui.com/material-ui/react-progress/#interactive-integration',
    example: <CircularIntegration />,
  },
];

export function ProgressBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

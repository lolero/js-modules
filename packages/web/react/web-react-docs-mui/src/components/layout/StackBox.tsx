import type React from 'react';
import BasicStack from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/stack/BasicStack';
import DirectionStack from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/stack/DirectionStack';
import DividerStack from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/stack/DividerStack';
import FlexboxGapStack from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/stack/FlexboxGapStack';
import InteractiveStack from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/stack/InteractiveStack';
import ResponsiveStack from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/stack/ResponsiveStack';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Playground',
    url: 'https://mui.com/material-ui/react-stack/#interactive-demo',
    example: <InteractiveStack />,
  },
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-stack/#basics',
    example: <BasicStack />,
  },
  {
    name: 'Direction',
    url: 'https://mui.com/material-ui/react-stack/#direction',
    example: <DirectionStack />,
  },
  {
    name: 'Dividers',
    url: 'https://mui.com/material-ui/react-stack/#dividers',
    example: <DividerStack />,
  },
  {
    name: 'Responsive',
    url: 'https://mui.com/material-ui/react-stack/#responsive-values',
    example: <ResponsiveStack />,
  },
  {
    name: 'Flexbox gap',
    url: 'https://mui.com/material-ui/react-stack/#flexbox-gap',
    example: <FlexboxGapStack />,
  },
];

export function StackBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

import type React from 'react';
import LabelBottomNavigation from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/bottom-navigation/LabelBottomNavigation';
import SimpleBottomNavigation from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/bottom-navigation/SimpleBottomNavigation';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-bottom-navigation/#bottom-navigation-with-no-label',
    example: <LabelBottomNavigation />,
  },
  {
    name: 'With labels',
    url: 'https://mui.com/material-ui/react-bottom-navigation/#bottom-navigation',
    example: <SimpleBottomNavigation />,
  },
];

export function BottomNavigationBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

import type React from 'react';
import ComboBox from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/autocomplete/ComboBox';
import Grouped from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/autocomplete/Grouped';
import Tags from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/autocomplete/Tags';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-autocomplete/#combo-box',
    example: <ComboBox />,
  },
  {
    name: 'Option groups',
    url: 'https://mui.com/material-ui/react-autocomplete/#grouped',
    example: <Grouped />,
  },
  {
    name: 'Multiple values',
    url: 'https://mui.com/material-ui/react-autocomplete/#multiple-values',
    example: <Tags />,
  },
];

export function AutocompleteBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

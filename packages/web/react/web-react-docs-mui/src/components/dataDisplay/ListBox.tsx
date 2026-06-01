import type React from 'react';
import BasicList from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/lists/BasicList';
import CheckboxList from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/lists/CheckboxList';
import CheckboxListSecondary from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/lists/CheckboxListSecondary';
import FolderList from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/lists/FolderList';
import InteractiveList from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/lists/InteractiveList';
import NestedList from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/lists/NestedList';
import PinnedSubheaderList from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/lists/PinnedSubheaderList';
import SelectedListItem from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/lists/SelectedListItem';
import SwitchListSecondary from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/lists/SwitchListSecondary';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Playground',
    url: 'https://mui.com/material-ui/react-list/#interactive',
    example: <InteractiveList />,
  },
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-list/#introduction',
    example: <BasicList />,
  },
  {
    name: 'Nested',
    url: 'https://mui.com/material-ui/react-list/#nested-list',
    example: <NestedList />,
  },
  {
    name: 'Folder',
    url: 'https://mui.com/material-ui/react-list/#folder-list',
    example: <FolderList />,
  },
  {
    name: 'Selected item',
    url: 'https://mui.com/material-ui/react-list/#selected-listitem',
    example: <SelectedListItem />,
  },
  {
    name: 'Primary action checkbox',
    url: 'https://mui.com/material-ui/react-list/#list-controls',
    example: <CheckboxList />,
  },
  {
    name: 'Secondary action checkbox',
    url: 'https://mui.com/material-ui/react-list/#checkbox',
    example: <CheckboxListSecondary />,
  },
  {
    name: 'Secondary action switch',
    url: 'https://mui.com/material-ui/react-list/#switch',
    example: <SwitchListSecondary />,
  },
  {
    name: 'Sticky subheader',
    url: 'https://mui.com/material-ui/react-list/#sticky-subheader',
    example: <PinnedSubheaderList />,
  },
];

export function ListBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

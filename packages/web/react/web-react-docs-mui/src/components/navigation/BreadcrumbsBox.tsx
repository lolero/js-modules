import type React from 'react';
import BasicBreadcrumbs from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/breadcrumbs/BasicBreadcrumbs';
import CollapsedBreadcrumbs from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/breadcrumbs/CollapsedBreadcrumbs';
import CustomSeparator from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/breadcrumbs/CustomSeparator';
import IconBreadcrumbs from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/breadcrumbs/IconBreadcrumbs';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-breadcrumbs/#basic-breadcrumbs',
    example: <BasicBreadcrumbs />,
  },
  {
    name: 'Separators',
    url: 'https://mui.com/material-ui/react-breadcrumbs/#custom-separator',
    example: <CustomSeparator />,
  },
  {
    name: 'Icons',
    url: 'https://mui.com/material-ui/react-breadcrumbs/#breadcrumbs-with-icons',
    example: <IconBreadcrumbs />,
  },
  {
    name: 'Collapsed',
    url: 'https://mui.com/material-ui/react-breadcrumbs/#collapsed-breadcrumbs',
    example: <CollapsedBreadcrumbs />,
  },
];

export function BreadcrumbsBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}

import type React from 'react';
import ActionAreaCard from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/cards/ActionAreaCard';
import BasicCard from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/cards/BasicCard';
import MediaCard from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/cards/MediaCard';
import OutlinedCard from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/cards/OutlinedCard';
import RecipeReviewCard from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/cards/RecipeReviewCard';
import SelectActionCard from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/cards/SelectActionCard';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-card/#introduction',
    example: <BasicCard />,
  },
  {
    name: 'Outlined',
    url: 'https://mui.com/material-ui/react-card/#outlined-card',
    example: <OutlinedCard />,
  },
  {
    name: 'Complex',
    url: 'https://mui.com/material-ui/react-card/#complex-interaction',
    example: <RecipeReviewCard />,
  },
  {
    name: 'Media',
    url: 'https://mui.com/material-ui/react-card/#media',
    example: <MediaCard />,
  },
  {
    name: 'Action area',
    url: 'https://mui.com/material-ui/react-card/#primary-action',
    example: <ActionAreaCard />,
  },
  {
    name: 'Active states',
    url: 'https://mui.com/material-ui/react-card/#active-state-styles',
    example: <SelectActionCard />,
  },
];

export function CardBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
